import CourseEnrollment from 'src/entity/StudentEnrollCourse.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface CourseEnrollmentRepositoryInterface
    extends BaseRepositoryInterface<CourseEnrollment> {
        getStudentCourses(studentId: number): Promise<CourseEnrollment[]>

        studentEnrollCourse(studentId: number, courseId: number): Promise<CourseEnrollment>
    }