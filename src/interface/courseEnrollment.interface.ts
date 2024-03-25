import Student from 'src/entity/Student.entity';
import CourseEnrollment from 'src/entity/StudentEnrollCourse.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface CourseEnrollmentRepositoryInterface
    extends BaseRepositoryInterface<CourseEnrollment> {
        getStudentCourses(studentId: Student): Promise<CourseEnrollment[]>
    }