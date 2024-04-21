import { Column, Entity, ManyToOne } from 'typeorm';
import Student from './Student.entity';
import Course from './Course.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'course_enrollment', schema: 'ailms' })
export default class CourseEnrollment extends BaseEntity{
  @Column()
  date_registration: number;

  @ManyToOne(() => Course, (Course) => Course.courseEnrollment)
  course: Course;

  @ManyToOne(() => Student, (Student) => Student.courseEnrollment)
  student: Student;
}