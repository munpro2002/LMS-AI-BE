import { ChildEntity, Column, OneToMany } from 'typeorm';
import CourseEnrollment from './StudentEnrollCourse.entity';
import Payment from './Payment.entity';
import Comment from './Comment.entity';
import AssigmentAttempt from './StudentTakeAssigment.entity';
import User from './User.entity';

@ChildEntity()
export default class Student extends User{
  @Column()
  region: string;

  @Column()
  highest_education: string;

  @Column()
  age_band: string;

  @Column()
  disability: boolean;

  @OneToMany(() => CourseEnrollment, (CourseEnrollment) => CourseEnrollment.student)
  courseEnrollment: CourseEnrollment[];

  @OneToMany(() => Payment, (Payment) => Payment.student)
  payment: Payment[];

  @OneToMany(() => Comment, (Comment) => Comment.student)
  comment: Comment[];

  @OneToMany(() => AssigmentAttempt, (AssigmentAttempt) => AssigmentAttempt.student)
  assignment_attempt: AssigmentAttempt[];
}
