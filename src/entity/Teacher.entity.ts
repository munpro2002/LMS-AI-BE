import { Column, ChildEntity, OneToMany } from 'typeorm';
import CourseEdition from './TeacherEditCourse.entity';
import Comment from './Comment.entity';
import User from './User.entity';

@ChildEntity()
export default class Teacher extends User {
  @Column()
  specialist: string;

  @OneToMany(() => CourseEdition, (CourseEdition) => CourseEdition.teacher)
  courseEdition: CourseEdition[];

  @OneToMany(() => Comment, (Comment) => Comment.teacher)
  comment: Comment[];
}
