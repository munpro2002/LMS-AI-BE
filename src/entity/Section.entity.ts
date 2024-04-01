import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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

  @OneToMany(() => Lesson, (Lesson) => Lesson.section)
  lesson: Lesson[];

  @OneToMany(() => Material, (material) => material.section)
  material: Material;
  
  @OneToOne(() => Quiz, (quiz) => quiz.section)
  @JoinColumn()
  quiz: Quiz;
}
