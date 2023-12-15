import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Section from './Section.entity';
@Entity({ name: 'forum', schema: 'ailms' })
export default class Forum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Section)
  @JoinColumn()
  section: Section
}
