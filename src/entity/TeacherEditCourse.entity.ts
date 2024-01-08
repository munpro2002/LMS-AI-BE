import { Entity, ManyToOne } from 'typeorm';
import Course from './Course.entity';
import Teacher from './Teacher.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'course_edition', schema: 'ailms' })
export default class CourseEdition extends BaseEntity{
  @ManyToOne(() => Course, (Course) => Course.courseEdition)
  course: Course;

  @ManyToOne(() => Teacher, (Teacher) => Teacher.courseEdition)
  teacher: Teacher;
}
