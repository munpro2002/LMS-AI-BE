
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { CourseEditionRepositoryInterface } from "src/interface/courseEdition.interface";
import { TeacherRepositoryInterface } from "src/interface/teacher.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { CourseInformationDtos } from "src/dto/CourseInformationDtos";
import { CourseEnrollmentRepositoryInterface } from "src/interface/courseEnrollment.interface";
import { StudentRepositoryInterface } from "src/interface/student.interface";

@Injectable()
export class CourseService {
    constructor(
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepositoryInterface,
        @Inject('CourseEditionRepositoryInterface') private courseEditionRepository: CourseEditionRepositoryInterface,  
        @Inject('TeacherRepositoryInterface') private teacherRepository: TeacherRepositoryInterface,
        @Inject('StudentRepositoryInterface') private studentRepository: StudentRepositoryInterface,
        @Inject('AdminRepositoryInterface') private adminRepository: AdminRepositoryInterface,
        @Inject('CourseEnrollmentRepositoryInterface') private courseEnrollmentRepository: CourseEnrollmentRepositoryInterface
    ) {}

    async createNewCourse(courseInformationDtos: CourseInformationDtos, request: Request) {
        const {teacherInChargeIds, ...courseInformation} = courseInformationDtos;
        
        const admin = await this.adminRepository.findById(request['user'].sub);
        const newCourse = this.courseRepository.create({...courseInformation, createdBy: admin});
        
        await this.courseRepository.save(newCourse);

        teacherInChargeIds.forEach(async id => {
            const teacher = await this.teacherRepository.findById(id);
            const courseEdition = this.courseEditionRepository.create({teacher: teacher, course: newCourse});

            await this.courseEditionRepository.save(courseEdition)
        })

        return newCourse;
    }

    async getAllAvailableCourses() {
        return await this.courseRepository.findAll(true);
    }

    async getStudentCourses(request: Request) {
        const studentId = request['user'].sub;

        const student = await this.studentRepository.findById(studentId);

        return this.courseEnrollmentRepository.getStudentCourses(student);
    }
}
  