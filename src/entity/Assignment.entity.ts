import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import Course from './Course.entity';
import AssigmentAttempt from './StudentTakeAssigment.entity';
@Entity({ name: 'assignment', schema: 'ailms' })
export default class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  duration: number;

  @Column({ nullable: true})
  description: string;

  @ManyToOne(() => Course, (Course) => Course.assignment)
  course: Course;

  @OneToMany(() => AssigmentAttempt, (AssigmentAttempt) => AssigmentAttempt.assignment)
  assignment_attempt: AssigmentAttempt[];
}