import Student from 'src/entity/Student.entity';
import { UserInformationDto } from 'src/dto/UserInfomationDtos';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface StudentRepositoryInterface
   extends BaseRepositoryInterface<Student> {
      createNewStudent(userInformationDto: UserInformationDto): Promise<Student>;
   }