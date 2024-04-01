import {Column, Entity, ManyToOne} from 'typeorm';
import BaseEntity from './base/base.entity';
import Student from './Student.entity';
import Quiz from './Quiz.entity';

@Entity({ name: 'student_attempt_quiz', schema: 'ailms' })
export default class StudentAttemptQuiz extends BaseEntity{
  @Column()
  score: number;
  
  @ManyToOne(() => Student, (Student) => Student.student_attempt_quiz)
  student: Student;

  @ManyToOne(() => Quiz, (Quiz) => Quiz.student_attempt_quiz)
  quiz: Quiz;
}
