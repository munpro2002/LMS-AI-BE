import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import CourseEnrollment from './StudentEnrollCourse.entity';

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
}
