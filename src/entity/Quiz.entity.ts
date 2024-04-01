import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import Section from './Section.entity';
import BaseEntity from './base/base.entity';
import StudentAttemptQuiz from './StudentAttemptQuiz.entity';

@Entity({ name: 'quiz', schema: 'ailms' })
export default class Quiz extends BaseEntity{
  @Column()
  question: string;

  @Column()
  first_choice: string;

  @Column()
  second_choice: string;
  
  @Column()
  third_choice: string;

  @Column()
  fourth_choice: string;

  @Column()
  correct_choice: string;

  @OneToOne(() => Section, (section) => section.quiz)
  section: Section;

  @OneToMany(() => StudentAttemptQuiz, (student_attempt_quiz) => student_attempt_quiz.quiz)
  student_attempt_quiz: StudentAttemptQuiz[];
}
