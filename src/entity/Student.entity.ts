import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import CourseEnrollment from './StudentEnrollCourse.entity';
import Payment from './Payment.entity';
import Comment from './Comment.entity';
import AssigmentAttempt from './StudentTakeAssigment.entity';
@Entity({ name: 'student', schema: 'ailms' })
export default class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => CourseEnrollment, (CourseEnrollment) => CourseEnrollment.student)
  courseEnrollment: CourseEnrollment[];

  @OneToMany(() => Payment, (Payment) => Payment.student)
  payment: Payment[];

  @OneToMany(() => Comment, (Comment) => Comment.student)
  comment: Comment[];

  @OneToMany(() => AssigmentAttempt, (AssigmentAttempt) => AssigmentAttempt.student)
  assignment_attempt: AssigmentAttempt[];
}
