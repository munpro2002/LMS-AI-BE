import Course from 'src/entity/Course.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface CourseRepositoryInterface
    extends BaseRepositoryInterface<Course> {}