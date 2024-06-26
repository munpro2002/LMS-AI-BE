import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import StudentAttemptQuiz from "src/entity/StudentAttemptQuiz.entity";

export class StudentAttemptQuizRepository extends BaseRepositoryAbstract<StudentAttemptQuiz> {
    constructor(
        @InjectRepository(StudentAttemptQuiz)
        private readonly studentAttemptQuizRepository: Repository<StudentAttemptQuiz>    
    ) {
        super(studentAttemptQuizRepository);
    }

    getStudentAttemptQuiz(studentId: number, courseId: number) {
        return this.studentAttemptQuizRepository.createQueryBuilder('StudentAttemptQuiz')
            .innerJoin('StudentAttemptQuiz.quiz', 'Quiz')
            .innerJoin('Quiz.section', 'Section')
            .where('StudentAttemptQuiz.studentId', {studentId})
            .where('Section.courseId', {courseId})
            .getMany();
    }
}