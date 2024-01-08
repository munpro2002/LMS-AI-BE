import { Entity, ManyToOne } from 'typeorm';
import Student from './Student.entity';
import Assignment from './Assignment.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'assigment_attempt', schema: 'ailms' })
export default class AssigmentAttempt extends BaseEntity{

  @ManyToOne(() => Assignment, (Assignment) => Assignment.assignment_attempt)
  assignment: Assignment;

  @ManyToOne(() => Student, (Student) => Student.assignment_attempt)
  student: Student;
}
