import { Column, Entity, TableInheritance } from 'typeorm';
import BaseEntity from './base/base.entity';

@Entity({ name: 'user', schema: 'ailms' })
@TableInheritance({column: { type: 'varchar', name: 'role'}})
export default class User extends BaseEntity{
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  status: boolean;
}
