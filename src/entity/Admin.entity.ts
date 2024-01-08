import { ChildEntity, OneToMany } from 'typeorm';
import User from './User.entity';
import Course from './Course.entity';

@ChildEntity()
export default class Admin extends User {
  @OneToMany(() => Course, (Course) => Course.createdBy)
  course: Course[];
}
