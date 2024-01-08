import CourseEdition from "src/entity/TeacherEditCourse.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class CourseEditionRepository extends BaseRepositoryAbstract<CourseEdition> {
    constructor(
        @InjectRepository(CourseEdition)
        private readonly courseEditionRepository: Repository<CourseEdition>    
    ) {
        super(courseEditionRepository);
    }
}