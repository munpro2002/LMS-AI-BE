import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Student from './Student.entity';
import Assignment from './Assignment.entity';

@Entity({ name: 'assigment_attempt', schema: 'ailms' })
export default class AssigmentAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Assignment, (Assignment) => Assignment.assignment_attempt)
  assignment: Assignment;

  @ManyToOne(() => Student, (Student) => Student.assignment_attempt)
  student: Student;
}
