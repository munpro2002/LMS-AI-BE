import Admin from 'src/entity/Admin.entity';
import { UserInformationDto } from 'src/dto/UserInfomationDtos';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface AdminRepositoryInterface
    extends BaseRepositoryInterface<Admin> {
      createNewAdmin(userInformationDto: UserInformationDto): Promise<Admin>;
    }