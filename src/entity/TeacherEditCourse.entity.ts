import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Course from './Course.entity';
import Teacher from './Teacher.entity';

@Entity({ name: 'course_edition', schema: 'ailms' })
export default class CourseEdition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (Course) => Course.courseEdition)
  course: Course;

  @ManyToOne(() => Teacher, (Teacher) => Teacher.courseEdition)
  teacher: Teacher;
}
