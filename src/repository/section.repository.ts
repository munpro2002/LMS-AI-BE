import Section from "src/entity/Section.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { Inject } from "@nestjs/common";

export class SectionRepository extends BaseRepositoryAbstract<Section> {
    constructor(
        @InjectRepository(Section) private readonly sectionRepository: Repository<Section>,
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepositoryInterface,
    ) {
        super(sectionRepository);
    }

    async getCourseSections(courseId: number): Promise<Section[]> {
        const course =  await this.courseRepository.findById(courseId);

        return await this.findBy({
            where: {
                course: course,
            },
            relations: ["lesson", "quiz"]
        })
    }
}