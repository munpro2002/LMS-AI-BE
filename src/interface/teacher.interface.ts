import Teacher from 'src/entity/Teacher.entity';
import { UserInformationDto } from 'src/dto/UserInfomationDtos';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface TeacherRepositoryInterface
   extends BaseRepositoryInterface<Teacher> {
      createNewTeacher(userInformationDto: UserInformationDto): Promise<Teacher>;
   }