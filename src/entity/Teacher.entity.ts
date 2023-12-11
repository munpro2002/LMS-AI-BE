import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import CourseEdition from './TeacherEditCourse.entity';

@Entity({ name: 'teacher', schema: 'ailms' })
export default class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  role: string;

  @Column({ nullable: true })
  specialist: string;

  @OneToMany(() => CourseEdition, (CourseEdition) => CourseEdition.teacher)
  courseEdition: CourseEdition[];
}
