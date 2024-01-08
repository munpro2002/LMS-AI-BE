import Student from 'src/entity/Student.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface StudentRepositoryInterface
    extends BaseRepositoryInterface<Student> {}