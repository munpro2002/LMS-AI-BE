import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Timestamp } from 'typeorm';
import Student from './Student.entity';
import BaseEntity from './base/base.entity';

@Entity({ name: 'payment', schema: 'ailms' })
export default class Payment extends BaseEntity{
  @Column()
  date_pay: Date;

  @Column()
  total: number;

  @Column()
  payment_type: string;

  @ManyToOne(() => Student, (Student) => Student.payment)
  student: Student;
}
