import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Section from './Section.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'lesson', schema: 'ailms' })
export default class Lesson extends BaseEntity{
  @Column()
  name: string;
  
  @Column()
  video_path: string;

  @Column()
  attach_file_path: string;

  @ManyToOne(() => Section, (Section) => Section.lesson)
  section: Section;
}
