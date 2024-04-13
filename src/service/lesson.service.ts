import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { LessonInformationDtos } from "src/dto/SectionInformationDtos";
import { LessonRepository } from "src/repository/lesson.repository";
import { SectionRepository } from "src/repository/section.repository";

@Injectable()
export class LessonService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('LessonRepositoryInterface') private lessonRepository: LessonRepository,
    ) {}

    async saveLesson(lessonInformationDtos: LessonInformationDtos) {
        const {lessonId, sectionId, ...lessonInfo} = lessonInformationDtos;

        let lesson = null;
        
        if (lessonId) {
            lesson = await this.lessonRepository.update(sectionId, {...lessonInfo});
        } else {
            const relatedSection = await this.sectionRepository.findById(sectionId);
            lesson = await this.lessonRepository.save({...lessonInfo, section: relatedSection});
        }

        return lesson;
    }

    async deleteLesson(lessonId: number) {
        return await this.lessonRepository.delete(lessonId);
    }
}