import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Student from './Student.entity';
import Course from './Course.entity';

@Entity({ name: 'course_enrollment', schema: 'ailms' })
export default class CourseEnrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (Course) => Course.courseEnrollment)
  course: Course;

  @ManyToOne(() => Student, (Student) => Student.courseEnrollment)
  student: Student;
}
