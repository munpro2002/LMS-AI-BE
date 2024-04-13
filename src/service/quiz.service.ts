import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { QuizInformationDtos } from "src/dto/SectionInformationDtos";
import { QuizRepository } from "src/repository/quiz.repository";
import { SectionRepository } from "src/repository/section.repository";

@Injectable()
export class QuizService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('QuizRepositoryInterface') private quizRepository: QuizRepository,
    ) {}

    async saveQuiz(quizInformationDtos: QuizInformationDtos) {
        const {quizId, sectionId, ...quizInfo} = quizInformationDtos;

        let lesson = null;
        
        if (quizId) {
            lesson = await this.quizRepository.update(sectionId, {...quizInfo});
        } else {
            const relatedSection = await this.sectionRepository.findById(sectionId);
            lesson = await this.quizRepository.save({...quizInfo, section: relatedSection});
        }

        return lesson;
    }

    async deleteQuiz(lessonId: number) {
        return await this.quizRepository.delete(lessonId);
    }
}