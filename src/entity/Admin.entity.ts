import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from './Course.entity';

@Entity({ name: 'admin', schema: 'ailms' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Course, (Course) => Course.createdBy)
  course: Course[];
}
