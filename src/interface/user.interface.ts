import User from 'src/entity/User.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface UserRepositoryInterface
   extends BaseRepositoryInterface<User> {
      getUserByEmail(email: string): Promise<User>;
   }