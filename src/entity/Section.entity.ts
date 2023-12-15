import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import Course from './Course.entity';
import Lesson from './Lesson.entity';
import Quiz from './Quiz.entity';
@Entity({ name: 'section', schema: 'ailms' })
export default class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  teacher_note: string;

  @ManyToOne(() => Course, (Course) => Course.section)
  course: Course;

  @OneToMany(() => Lesson, (Lesson) => Lesson.section)
  lesson: Lesson[];

  @OneToMany(() => Quiz, (Quiz) => Quiz.section)
  quiz: Quiz[];
}
