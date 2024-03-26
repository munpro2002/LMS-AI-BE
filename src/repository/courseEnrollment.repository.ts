import CourseEnrollment from "src/entity/StudentEnrollCourse.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Inject } from "@nestjs/common";
import { StudentRepositoryInterface } from "src/interface/student.interface";
import { CourseRepositoryInterface } from "src/interface/course.interface";

export class CourseEnrollmentRepository extends BaseRepositoryAbstract<CourseEnrollment> {
    constructor(
        @InjectRepository(CourseEnrollment) private readonly courseEnrollmentRepository: Repository<CourseEnrollment>,
        @Inject('StudentRepositoryInterface') private studentRepository: StudentRepositoryInterface,
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepositoryInterface,
    ) {
        super(courseEnrollmentRepository);
    }

    async getStudentCourses(studentId: number): Promise<CourseEnrollment[]> {
        const student = await this.studentRepository.findById(studentId);
        
        return await this.findBy({student})
    }

    async studentEnrollCourse(studentId: number, courseId: number) {
        const student = await this.studentRepository.findById(studentId)
        const course = await this.courseRepository.findById(courseId)

        const courseEnrollment = this.create({student, course})

        return await this.save(courseEnrollment);
    }
}