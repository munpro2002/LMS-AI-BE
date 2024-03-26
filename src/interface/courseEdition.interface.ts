import Course from 'src/entity/Course.entity';
import CourseEdition from 'src/entity/TeacherEditCourse.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface CourseEditionRepositoryInterface
    extends BaseRepositoryInterface<CourseEdition> {
        teacherAssignedCourse(teacherId: number, course: Course): Promise<CourseEdition> 
    }