import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base/base.entity';
import StudentAccessMaterial from './StudentAccessMaterial.entity';
import Section from './Section.entity';

@Entity({ name: 'material', schema: 'ailms' })
export default class Material extends BaseEntity{
  @Column()
  activity_type: string;

  @Column()
  url_path: string;

  @ManyToOne(() => Section, (section) => section.material, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  section: Section;

  @OneToMany(() => StudentAccessMaterial, (StudentAccessMaterial) => StudentAccessMaterial.material)
  student_access_material: StudentAccessMaterial[];
}
