import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { TeacherRepositoryInterface } from "src/interface/teacher.interface";
import { StudentRepositoryInterface } from "src/interface/student.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { UserRepositoryInterface } from "src/interface/user.interface";
import { UserLoginCredentialsDto } from "src/dto/UserLoginCredentialsDto";
import { UserInformationDto } from "src/dto/UserInfomationDtos";
import { JwtService } from "@nestjs/jwt";
import { HTTPMESSAGE } from "src/enums/HttpExceptionMessage.enum";
import User from "src/entity/User.entity";
import * as bcrypt from 'bcrypt';
import { USERROLE } from "src/enums/UserRole.enum";

@Injectable()
export class UserService {
    constructor(
      private jwtService: JwtService,
      @Inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface,
      @Inject('TeacherRepositoryInterface') private teacherRepository: TeacherRepositoryInterface,
      @Inject('AdminRepositoryInterface') private adminRepository: AdminRepositoryInterface,
      @Inject('StudentRepositoryInterface') private studentRepository: StudentRepositoryInterface,
    ) {}

    async verifyUserLoginCredentials(userLoginCredentialsDto: UserLoginCredentialsDto) {
      const { email, password } = userLoginCredentialsDto;
      const user = await this.userRepository.getUserByEmail(email);
      
      if (!user) {
        throw new HttpException(HTTPMESSAGE.NO_USER_FOUND, HttpStatus.BAD_REQUEST);
      }
      
      const matchedPassword = bcrypt.compareSync(password, user.password);
      
      if (!matchedPassword) {
        throw new HttpException(HTTPMESSAGE.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
      }

      return this.generateJwt(user);
    }

    async registerNewUser(userInformationDto: UserInformationDto) {
      await this.checkEmailExist(userInformationDto.email);
      
      const password = this.encodePassword(userInformationDto.password);

      const user = await this.studentRepository.createNewStudent({...userInformationDto, password});

      return this.generateJwt(user)
    }

    async createNewUser(userInformationDto: UserInformationDto) {
      const {roleType, ...userInformation} = userInformationDto;

      if (!roleType) {
        throw new HttpException(HTTPMESSAGE.MISSING_FIELDS, HttpStatus.BAD_REQUEST)
      }

      await this.checkEmailExist(userInformation.email);

      const password = this.encodePassword(userInformation.password);

      let user = null;

      if (roleType === USERROLE.ADMIN) {
        user = await this.adminRepository.createNewAdmin({...userInformation, password});
      }

      if (roleType === USERROLE.TEACHER) {
        user = await this.teacherRepository.createNewTeacher({...userInformation, password});
      }
    
      return this.generateJwt(user);
    }

    async checkEmailExist(email: string) {
      const user = await this.userRepository.getUserByEmail(email);

      if (user) {
        throw new HttpException(HTTPMESSAGE.EMAIL_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST)
      }
    }

    encodePassword = (originPassword: string) => {
      const SALT = 10;
      const salt = bcrypt.genSaltSync(SALT);
      return bcrypt.hashSync(originPassword, salt);
    }
 
    async generateJwt(user: User) {
      const payload = {sub: user.id, userName: user.name};
      
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    }

    async getAvailableTeachers() {
      return this.teacherRepository.getAvailableTeachers();
    }
}
  