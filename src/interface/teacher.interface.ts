import Teacher from 'src/entity/Teacher.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface TeacherRepositoryInterface
    extends BaseRepositoryInterface<Teacher> {}