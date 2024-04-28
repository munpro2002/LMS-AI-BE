import StudentAccessMaterial from 'src/entity/StudentAccessMaterial.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface StudentAccessMaterialRepositoryInterface
   extends BaseRepositoryInterface<StudentAccessMaterial> {
      getStudentAccessMaterial(studentId: number, courseId: number): Promise<StudentAccessMaterial[]>;
   }