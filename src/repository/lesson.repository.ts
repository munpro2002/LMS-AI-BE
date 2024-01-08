import Lesson from "src/entity/Lesson.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class LessonRepository extends BaseRepositoryAbstract<Lesson> {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>    
    ) {
        super(lessonRepository);
    }
}