import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Timestamp } from 'typeorm';
import Student from './Student.entity';
@Entity({ name: 'payment', schema: 'ailms' })
export default class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date_pay: Date;

  @Column()
  total: number;

  @Column()
  payment_type: string;

  @ManyToOne(() => Student, (Student) => Student.payment)
  student: Student;
}
