import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import StudentAccessMaterial from "src/entity/StudentAccessMaterial.entity";

export class StudentAccessMaterialRepository extends BaseRepositoryAbstract<StudentAccessMaterial> {
    constructor(
        @InjectRepository(StudentAccessMaterial)
        private readonly studentAccessMaterialRepository: Repository<StudentAccessMaterial>    
    ) {
        super(studentAccessMaterialRepository);
    }
}