import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import Course from './Course.entity';
import Lesson from './Lesson.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'section', schema: 'ailms' })
export default class Section extends BaseEntity{
  @Column()
  name: string;

  @ManyToOne(() => Course, (Course) => Course.section)
  course: Course;

  @OneToMany(() => Lesson, (Lesson) => Lesson.section)
  lesson: Lesson[];
}
