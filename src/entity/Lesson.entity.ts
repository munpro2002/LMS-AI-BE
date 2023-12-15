import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Section from './Section.entity';

@Entity({ name: 'lesson', schema: 'ailms' })
export default class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  video_path: string;

  @Column()
  attach_file_path: string;

  @ManyToOne(() => Section, (Section) => Section.lesson)
  section: Section;
}
