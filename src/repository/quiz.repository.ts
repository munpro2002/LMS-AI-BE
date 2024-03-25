import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Quiz from "src/entity/Quiz.entity";

export class QuizRepository extends BaseRepositoryAbstract<Quiz> {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>    
    ) {
        super(quizRepository);
    }
}