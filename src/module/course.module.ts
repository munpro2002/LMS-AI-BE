import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from 'src/service/course.service';
import { SectionService } from 'src/service/section.service';
import { AdminRepository } from 'src/repository/admin.repository';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { StudentRepository } from 'src/repository/student.repository';
import { CourseRepository } from 'src/repository/course.repository';
import { CourseEditionRepository } from 'src/repository/courseEdition.repository';
import { SectionRepository } from 'src/repository/section.repository';
import { CourseEnrollmentRepository } from 'src/repository/courseEnrollment.repository';
import { QuizRepository } from 'src/repository/quiz.repository';
import { LessonRepository } from 'src/repository/lesson.repository';
import { CourseController } from 'src/controller/course.controller';
import { SectionController } from 'src/controller/section.controller';
import Admin from 'src/entity/Admin.entity';
import Teacher from 'src/entity/Teacher.entity';
import Student from 'src/entity/Student.entity';
import Course from 'src/entity/Course.entity';
import CourseEdition from 'src/entity/TeacherEditCourse.entity';
import Lesson from 'src/entity/Lesson.entity';
import Section from 'src/entity/Section.entity';
import Quiz from 'src/entity/Quiz.entity';
import CourseEnrollment from 'src/entity/StudentEnrollCourse.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Admin,
            Teacher,
            Student,
            Course,
            CourseEdition,
            CourseEnrollment,
            Lesson,
            Section,
            Quiz
        ])
    ],
    controllers: [CourseController, SectionController],
    providers: [
        CourseService,
        SectionService,
        { provide: 'CourseEditionRepositoryInterface', useClass: CourseEditionRepository},
        { provide: 'CourseRepositoryInterface', useClass: CourseRepository},
        { provide: 'AdminRepositoryInterface', useClass: AdminRepository},
        { provide: 'TeacherRepositoryInterface', useClass: TeacherRepository},
        { provide: 'StudentRepositoryInterface', useClass: StudentRepository},
        { provide: 'SectionRepositoryInterface', useClass: SectionRepository},
        { provide: 'LessonRepositoryInterface', useClass: LessonRepository},
        { provide: 'QuizRepositoryInterface', useClass: QuizRepository},
        { provide: 'CourseEnrollmentRepositoryInterface', useClass: CourseEnrollmentRepository},
    ]
})
export class CourseModule {}