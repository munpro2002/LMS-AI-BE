import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Section from './Section.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'forum', schema: 'ailms' })
export default class Forum extends BaseEntity{
  @OneToOne(() => Section)
  @JoinColumn()
  section: Section
}
