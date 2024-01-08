import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Section from './Section.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'quiz', schema: 'ailms' })
export default class Quiz extends BaseEntity{
  @Column()
  question: string;

  @Column()
  first_choice: string;

  @Column()
  second_choice: string;
  
  @Column()
  third_choice: string;

  @Column()
  fourth_choice: string;

  @Column()
  correct_choice: string;

  @ManyToOne(() => Section, (Section) => Section.quiz)
  section: Section[];
}
