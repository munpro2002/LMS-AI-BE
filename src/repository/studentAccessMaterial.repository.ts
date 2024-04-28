import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import StudentAccessMaterial from "src/entity/StudentAccessMaterial.entity";

export class StudentAccessMaterialRepository extends BaseRepositoryAbstract<StudentAccessMaterial> {
    constructor(
        @InjectRepository(StudentAccessMaterial)
        private readonly studentAccessMaterialRepository: Repository<StudentAccessMaterial>    
    ) {
        super(studentAccessMaterialRepository);
    }

    getStudentAccessMaterial(studentId: number, courseId: number) {
        return this.studentAccessMaterialRepository.createQueryBuilder('StudentAccessMaterial')
            .innerJoin('StudentAccessMaterial.material', 'Material')
            .innerJoin('Material.section', 'Section')
            .where('StudentAccessMaterial.studentId = :studentId', {studentId})
            .where('Section.courseId = :courseId', {courseId})
            .getMany();
    }
}