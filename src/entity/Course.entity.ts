import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import CourseEnrollment from './StudentEnrollCourse.entity';
import CourseEdition from './TeacherEditCourse.entity';
import Admin from './Admin.entity';
import Section from './Section.entity';
import Assignment from './Assignment.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'course', schema: 'ailms' })
export default class Course extends BaseEntity{
  @Column()
  title: string;
 
  @Column({type: 'varchar', length: 1000})
  description: string;
 
  @Column()
  category: string;

  @Column()
  language: string;

  @Column()
  level: string;

  @Column()
  thumbnailPath: string;

  @Column()
  trailerPath: string;

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

  @OneToMany(() => Section, (Section) => Section.course)
  section: Section[];

  @OneToMany(() => Assignment, (Assignment) => Assignment.course)
  assignment: Assignment[];
}
