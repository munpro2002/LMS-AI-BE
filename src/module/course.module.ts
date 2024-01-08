import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from 'src/service/course.service';
import { AdminRepository } from 'src/repository/admin.repository';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { StudentRepository } from 'src/repository/student.repository';
import { CourseRepository } from 'src/repository/course.repository';
import { CourseEditionRepository } from 'src/repository/courseEdition.repository';
import { CourseController } from 'src/controller/course.controller';
import Admin from 'src/entity/Admin.entity';
import Teacher from 'src/entity/Teacher.entity';
import Student from 'src/entity/Student.entity';
import Course from 'src/entity/Course.entity';
import CourseEdition from 'src/entity/TeacherEditCourse.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin, Teacher ,Student, Course, CourseEdition])
    ],
    controllers: [CourseController],
    providers: [
        CourseService,
        { provide: 'CourseEditionRepositoryInterface', useClass: CourseEditionRepository},
        { provide: 'CourseRepositoryInterface', useClass: CourseRepository},
        { provide: 'AdminRepositoryInterface', useClass: AdminRepository},
        { provide: 'TeacherRepositoryInterface', useClass: TeacherRepository},
        { provide: 'StudentRepositoryInterface', useClass: StudentRepository},
    ]
})
export class CourseModule {}