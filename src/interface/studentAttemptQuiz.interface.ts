import StudentAttemptQuiz from 'src/entity/StudentAttemptQuiz.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface StudentAttemptQuizRepositoryInterface
   extends BaseRepositoryInterface<StudentAttemptQuiz> {
      getStudentAttemptQuiz(studentId: number, courseId: number): Promise<StudentAttemptQuiz[]>;
   }