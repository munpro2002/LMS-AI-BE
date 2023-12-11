import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import CourseEnrollment from './StudentEnrollCourse.entity';
import CourseEdition from './TeacherEditCourse.entity';
import Admin from './Admin.entity';

@Entity({ name: 'course', schema: 'ailms' })
export default class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  language: string;

  @Column({ nullable: true})
  rating: number;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => CourseEnrollment, (CourseEnrollment) => CourseEnrollment.course)
  courseEnrollment: CourseEnrollment[];

  @OneToMany(() => CourseEdition, (CourseEdition) => CourseEdition.course)
  courseEdition: CourseEdition[];

  @ManyToOne(() => Admin, (Admin) => Admin.course)
  createdBy: Admin;
}
