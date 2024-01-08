import Course from "src/entity/Course.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class CourseRepository extends BaseRepositoryAbstract<Course> {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>    
    ) {
        super(courseRepository);
    }
}