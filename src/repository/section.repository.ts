import Section from "src/entity/Section.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class SectionRepository extends BaseRepositoryAbstract<Section> {
    constructor(
        @InjectRepository(Section) private readonly sectionRepository: Repository<Section>
    ) {
        super(sectionRepository);
    }

    async getCourseSections(courseId: number): Promise<Section[]> {
        return await this.findBy({course: {id: courseId}}, ["quiz", "lesson", "material"])
    }
}