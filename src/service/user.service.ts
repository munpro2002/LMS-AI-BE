import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TeacherRepositoryInterface } from "src/interface/teacher.interface";
import { StudentRepositoryInterface } from "src/interface/student.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { UserRepositoryInterface } from "src/interface/user.interface";
import { UserLoginCredentialsDto } from "src/dto/UserLoginCredentialsDto";
import { UserInformationDto } from "src/dto/UserInfomationDtos";
import { HTTPMESSAGE } from "src/enums/HttpExceptionMessage.enum";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
      @Inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface,
      @Inject('TeacherRepositoryInterface') private teacherRepository: TeacherRepositoryInterface,
      @Inject('AdminRepositoryInterface') private adminRepository: AdminRepositoryInterface,
      @Inject('StudentRepositoryInterface') private studentRepository: StudentRepositoryInterface,
    ) {}

    async verifyUserLoginCredentials(userLoginCredentialsDto: UserLoginCredentialsDto) {
      const { email, password } = userLoginCredentialsDto;
      const user = await this.userRepository.findOneBy({email});
      
      if (!user) {
        throw new HttpException(HTTPMESSAGE.NO_USER_FOUND, HttpStatus.BAD_REQUEST);
      }
      
      const matchedPassword = bcrypt.compareSync(password, user.password);
      
      if (!matchedPassword) {
        throw new HttpException(HTTPMESSAGE.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
      }

      return user;
    }

    async registerNewUser(userInformationDto: UserInformationDto) {
      await this.checkEmailExist(userInformationDto.email);

      const password = this.encodePassword(userInformationDto.password);

      const newStudentUser = this.studentRepository.create(
        {...userInformationDto, password}
      );

      return this.studentRepository.save(newStudentUser);
    }

    async createNewUser(userInformationDto: UserInformationDto) {
      await this.checkEmailExist(userInformationDto.email);

      const password = this.encodePassword(userInformationDto.password);

      const newTeacherUser = this.teacherRepository.create(
        {...userInformationDto, password}
      );

      return this.teacherRepository.save(newTeacherUser);
    }

    async checkEmailExist(email: string) {
      const user = await this.userRepository.findOneBy({email: email});

      if (user) {
        throw new HttpException(HTTPMESSAGE.EMAIL_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST)
      }
    }

    encodePassword = (originPassword: string) => {
      const SALT = 10;
      const salt = bcrypt.genSaltSync(SALT);
      return bcrypt.hashSync(originPassword, salt);
    }
}
  