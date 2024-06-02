import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { QuizInformationDtos } from "src/dto/SectionInformationDtos";
import { CourseRepository } from "src/repository/course.repository";
import { QuizRepository } from "src/repository/quiz.repository";
import { SectionRepository } from "src/repository/section.repository";
import { StudentRepository } from "src/repository/student.repository";
import { StudentAttemptQuizRepository } from "src/repository/studentAttempQuiz.repository";

@Injectable()
export class QuizService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepository,
        @Inject('StudentRepositoryInterface') private studentRepository: StudentRepository,
        @Inject('QuizRepositoryInterface') private quizRepository: QuizRepository,
        @Inject('StudentAttemptQuizRepositoryInterface') private studentAttemptQuizRepository: StudentAttemptQuizRepository,
    ) {}

    async saveQuiz(quizInformationDtos: QuizInformationDtos) {
        const {quizId, sectionId, courseId, ...quizInfo} = quizInformationDtos;

        let quiz = null;
        
        if (quizId) {
            quiz = await this.quizRepository.update(quizId, {...quizInfo});
        } else {
            const relatedSection = await this.sectionRepository.findById(sectionId);
            const relatedCourse = await this.courseRepository.findById(courseId);
            quiz = await this.quizRepository.save({...quizInfo, section: relatedSection, course: relatedCourse});
        }

        return quiz;
    }

    async deleteQuiz(quizId: number) {
        return await this.quizRepository.delete(quizId);
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