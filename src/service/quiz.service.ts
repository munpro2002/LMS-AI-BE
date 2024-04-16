import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { QuizInformationDtos } from "src/dto/SectionInformationDtos";
import { QuizRepository } from "src/repository/quiz.repository";
import { SectionRepository } from "src/repository/section.repository";
import { StudentRepository } from "src/repository/student.repository";
import { StudentAttemptQuizRepository } from "src/repository/studentAttempQuiz.repository";

@Injectable()
export class QuizService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('StudentRepositoryInterface') private studentRepository: StudentRepository,
        @Inject('QuizRepositoryInterface') private quizRepository: QuizRepository,
        @Inject('StudentAttemptQuizRepositoryInterface') private studentAttemptQuizRepository: StudentAttemptQuizRepository,
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

    async updateQuizScore(quizId: number, studentId: number, score: number) {
        const quiz = await this.quizRepository.findById(quizId);
        const student = await this.studentRepository.findById(studentId);
        const studentAttemptQuizRecord = await this.studentAttemptQuizRepository.findOneBy({student, quiz});

        if (studentAttemptQuizRecord) {
            studentAttemptQuizRecord.score = score;
            await this.studentAttemptQuizRepository.save(studentAttemptQuizRecord);
        } else {
            const record = this.studentAttemptQuizRepository.create({quiz, student, score});
            await this.studentAttemptQuizRepository.save(record);
        }

        return true;
    }
}