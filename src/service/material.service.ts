import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { MaterialInformationDtos } from "src/dto/SectionInformationDtos";
import { SectionRepository } from "src/repository/section.repository";
import { StudentRepository } from "src/repository/student.repository";
import { MaterialRepository } from "src/repository/material.repository";
import { StudentAccessMaterialRepository } from "src/repository/studentAccessMaterial.repository";

@Injectable()
export class MaterialService {
    quizRepository: any;
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('StudentRepositoryInterface') private studentRepository: StudentRepository,
        @Inject('MaterialRepositoryInterface') private materialRepository: MaterialRepository,
        @Inject('StudentAccessMaterialRepositoryInterface') private studentAccessMaterialRepository: StudentAccessMaterialRepository,
    ) {}

    async saveMaterial(materialInformationDtos: MaterialInformationDtos) {
        const {materialId, sectionId, ...materialInfo} = materialInformationDtos;
        
        if (materialId) {
            await this.materialRepository.update(materialId, {...materialInfo});
        } else {
            const relatedSection = await this.sectionRepository.findById(sectionId);
            await this.materialRepository.save({...materialInfo, section: relatedSection});
        }

        return true;
    }

    async deleteMaterial(materialId: number) {
        return await this.materialRepository.delete(materialId);
    }

    
    async updateMaterialSumClick(quizId: number, studentId: number, numClickInAmountOfTime: number) {
        const material = await this.materialRepository.findById(quizId);
        const student = await this.studentRepository.findById(studentId);
        const studentAccessMaterialRecord = await this.studentAccessMaterialRepository.findOneBy({student, material});

        if (studentAccessMaterialRecord) {
            studentAccessMaterialRecord.sum_click += numClickInAmountOfTime;
            await this.studentAccessMaterialRepository.save(studentAccessMaterialRecord);
        } else {
            const record = this.studentAccessMaterialRepository.create({material, student, sum_click: numClickInAmountOfTime});
            await this.studentAccessMaterialRepository.save(record);
        }

        return true;
    }
}
  