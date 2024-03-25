
import { Injectable, Logger } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { SectionInformationDtos } from "src/dto/SectionInformationDtos";
import { CourseRepository } from "src/repository/course.repository";
import { LessonRepository } from "src/repository/lesson.repository";
import { QuizRepository } from "src/repository/quiz.repository";
import { SectionRepository } from "src/repository/section.repository";

@Injectable()
export class SectionService {
    constructor(
        @Inject('SectionRepositoryInterface') private sectionRepository: SectionRepository,
        @Inject('LessonRepositoryInterface') private lessonRepository: LessonRepository,
        @Inject('QuizRepositoryInterface') private quizRepository: QuizRepository,
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepository
    ) {}

    async createSection(sectionInformationDtos: SectionInformationDtos) {
        const {name, courseId, lessons, quiz} = sectionInformationDtos;

        const relatedCourse = await this.courseRepository.findById(courseId)
        
        let createdSection = this.sectionRepository.create({name, course: relatedCourse})
        createdSection = await this.sectionRepository.save(createdSection)
    
        for (const lesson of lessons) {
            const createdLesson = this.lessonRepository.create({...lesson, section: createdSection});
            await this.lessonRepository.save(createdLesson);
        }
        
        const createdQuiz = this.quizRepository.create({...quiz, section: createdSection});
        await this.quizRepository.save(createdQuiz);

        return createdSection
    }
}
  