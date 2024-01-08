import Admin from 'src/entity/Admin.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface AdminRepositoryInterface
    extends BaseRepositoryInterface<Admin> {}