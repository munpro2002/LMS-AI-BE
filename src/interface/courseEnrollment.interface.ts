import { CourseEnrollmentDtos } from 'src/dto/CouseEnrollmentDtos';
import CourseEnrollment from 'src/entity/StudentEnrollCourse.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface CourseEnrollmentRepositoryInterface
    extends BaseRepositoryInterface<CourseEnrollment> {
        getStudentCourses(studentId: number): Promise<CourseEnrollment[]>

        studentEnrollCourse(studentId: number, courseEnrollmentDtos: CourseEnrollmentDtos): Promise<CourseEnrollment>
    }