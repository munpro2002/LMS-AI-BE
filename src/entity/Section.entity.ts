import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base/base.entity';
import Course from './Course.entity';
import Lesson from './Lesson.entity';
import Quiz from './Quiz.entity';
import Material from './Material.entity';

@Entity({ name: 'section', schema: 'ailms' })
export default class Section extends BaseEntity{
  @Column()
  name: string;

  @ManyToOne(() => Course, (Course) => Course.section)
  course: Course;

  @OneToMany(() => Lesson, (Lesson) => Lesson.section, {
    cascade: true,
  })
  lesson: Lesson[];

  @OneToMany(() => Material, (material) => material.section, {
    cascade: true
  })
  material: Material[];
  
  @OneToMany(() => Quiz, (quiz) => quiz.section, {
    cascade: true
  })
  quiz: Quiz[];
}
