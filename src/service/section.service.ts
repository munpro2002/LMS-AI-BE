
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { SectionInformationDtos } from "src/dto/SectionInformationDtos";
import { CourseRepository } from "src/repository/course.repository";
import { LessonRepository } from "src/repository/lesson.repository";
import { MaterialRepository } from "src/repository/material.repository";
import { QuizRepository } from "src/repository/quiz.repository";
import { SectionRepository } from "src/repository/section.repository";

@Injectable()
export class SectionService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('LessonRepositoryInterface') private lessonRepository: LessonRepository,
        @Inject('QuizRepositoryInterface') private quizRepository: QuizRepository,
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepository,
        @Inject('MaterialRepositoryInterface') private materialRepository: MaterialRepository
    ) {}

    async saveSection(sectionInformationDtos: SectionInformationDtos) {
        const {lessons, quiz, materials, ...sectionInfo} = sectionInformationDtos;
        const {sectionId, name, courseId} = sectionInfo;
        let section = null;


        if (sectionId) {
            section = await this.sectionRepository.update(sectionId, {name});
        } else {
            const relatedCourse = await this.courseRepository.findById(courseId);
            section = await this.sectionRepository.save({name, course: relatedCourse});
        }
        
    
        if (lessons) {
            for (const lesson of lessons) {
                const {lessonId, ...lessonInfo} = lesson;

                if (lessonId) {
                    await this.lessonRepository.update(lessonId, lessonInfo);
                } else {
                    await this.lessonRepository.save({...lessonInfo, section});
                }

            }
        }

        if (quiz) {
            const {quizId, ...quizInfo} = quiz;

            if (quizId) {
                await this.quizRepository.update(quizId, quizInfo);
            } else {
                await this.quizRepository.save({...quiz, section});
            }
        }

        if (materials) {
            for (const material of materials) {
                const {materialId, ...materialInfo} = material;

                if (materialId) {
                    await this.materialRepository.update(materialId, materialInfo)
                } else {
                    await this.materialRepository.save({...materialInfo, section});
                }

            }
        }

        return section;
    }

    async getCourseSections(courseId: number) {
        return await this.sectionRepository.getCourseSections(courseId);
    }
}
  