import { Column, Entity, ManyToOne } from 'typeorm';
import Section from './Section.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'lesson', schema: 'ailms' })
export default class Lesson extends BaseEntity{
  @Column()
  name: string;
  
  @Column()
  video_path: string;

  @ManyToOne(() => Section, (Section) => Section.lesson)
  section: Section;
}
