import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base/base.entity';
import Material from './Material.entity';
import Student from './Student.entity';

@Entity({ name: 'student_access_material', schema: 'ailms' })
export default class StudentAccessMaterial extends BaseEntity{
  @Column()
  sum_click: number;

  @ManyToOne(() => Student, (student) => student.student_access_material)
  student: Student;

  @ManyToOne(() => Material, (material) => material.student_access_material)
  material: Material;
}
