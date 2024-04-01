import { ChildEntity, Column, OneToMany } from 'typeorm';
import CourseEnrollment from './StudentEnrollCourse.entity';
import StudentAttemptQuiz from './StudentAttemptQuiz.entity';
import User from './User.entity';
import StudentAccessMaterial from './StudentAccessMaterial.entity';

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

  @OneToMany(() => StudentAttemptQuiz, (studentAttemptQuiz) => studentAttemptQuiz.student)
  student_attempt_quiz: StudentAttemptQuiz[];

  @OneToMany(() => StudentAccessMaterial, (studentAccessMaterial) => studentAccessMaterial.student)
  student_access_material: StudentAccessMaterial[];
}
