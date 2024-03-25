import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import CourseEnrollment from "src/entity/StudentEnrollCourse.entity";
import Student from "src/entity/Student.entity";

export class CourseEnrollmentRepository extends BaseRepositoryAbstract<CourseEnrollment> {
    constructor(
        @InjectRepository(CourseEnrollment)
        private readonly courseEnrollmentRepository: Repository<CourseEnrollment>,
    ) {
        super(courseEnrollmentRepository);
    }

    async getStudentCourses(student: Student): Promise<CourseEnrollment[]> {
        return this.findBy({student})
    }
}