
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { SectionInformationDtos } from "src/dto/SectionInformationDtos";
import { CourseRepository } from "src/repository/course.repository";
import { SectionRepository } from "src/repository/section.repository";

@Injectable()
export class SectionService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepository,
    ) {}

    async saveSection(sectionInformationDtos: SectionInformationDtos) {
        const {sectionId, courseId, ...sectionInfo} = sectionInformationDtos;

        if (sectionId) {
            await this.sectionRepository.update(sectionId, {...sectionInfo});
        } else {
            const relatedCourse = await this.courseRepository.findById(courseId);
            await this.sectionRepository.save({...sectionInfo, course: relatedCourse});
        }

        return true;
    }

    async getCourseSections(courseId: number) {
        return await this.sectionRepository.getCourseSections(courseId);
    }

    async deleteSection(sectionId: number) {
        return await this.sectionRepository.delete(sectionId);
    }
}
  