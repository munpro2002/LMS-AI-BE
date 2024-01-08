import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import Student from './Student.entity';
import Teacher from './Teacher.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'comment', schema: 'ailms' })
export default class Comment extends BaseEntity{
  @Column()
  content: string;

  @Column()
  updated_time: Date;

  @ManyToOne(() => Student, (Student) => Student.comment)
  student: Student;

  @ManyToOne(() => Teacher, (Teacher) => Teacher.comment)
  teacher: Teacher;

  @ManyToOne(() => Comment, (Comment) => Comment.comment)
  comment: Comment;

  @OneToMany(() => Comment, (Comment) => Comment.comment_reply)
  comment_reply: Comment[];
}
