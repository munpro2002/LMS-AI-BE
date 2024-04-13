import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { MaterialInformationDtos } from "src/dto/SectionInformationDtos";
import { MaterialRepository } from "src/repository/material.repository";
import { SectionRepository } from "src/repository/section.repository";

@Injectable()
export class MaterialService {
    quizRepository: any;
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('MaterialRepositoryInterface') private materialRepository: MaterialRepository,
    ) {}

    async saveMaterial(materialInformationDtos: MaterialInformationDtos) {
        const {materialId, sectionId, ...materialInfo} = materialInformationDtos;

        let lesson = null;
        
        if (materialId) {
            lesson = await this.materialRepository.update(sectionId, {...materialInfo});
        } else {
            const relatedSection = await this.sectionRepository.findById(sectionId);
            lesson = await this.materialRepository.save({...materialInfo, section: relatedSection});
        }

        return lesson;
    }

    async deleteMaterial(materialId: number) {
        return await this.materialRepository.delete(materialId);
    }
}
  