import CourseEdition from "src/entity/TeacherEditCourse.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherRepositoryInterface } from "src/interface/teacher.interface";
import { Inject } from "@nestjs/common";
import Course from "src/entity/Course.entity";

export class CourseEditionRepository extends BaseRepositoryAbstract<CourseEdition> {
    constructor(
        @InjectRepository(CourseEdition) private readonly courseEditionRepository: Repository<CourseEdition>,
        @Inject('TeacherRepositoryInterface') private teacherRepository: TeacherRepositoryInterface,
    ) {
        super(courseEditionRepository);
    }

    async getTeacherCourses(teacherId: number) {
        const teacher = this.teacherRepository.findById(teacherId)

        return await this.findBy({teacher}, ['course'])
    }

    async teacherAssignedCourse(teacherId: number, course: Course): Promise<CourseEdition> {
        const teacher = await this.teacherRepository.findById(teacherId);

        const courseEdition = this.create({teacher, course});
        
        return await this.save(courseEdition);
    }
}