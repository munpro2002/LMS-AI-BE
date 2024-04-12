
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { CourseEditionRepositoryInterface } from "src/interface/courseEdition.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { CourseInformationDtos } from "src/dto/CourseInformationDtos";
import { CourseEnrollmentRepositoryInterface } from "src/interface/courseEnrollment.interface";
import { ENTITY_STATUS } from "src/constants/EntityStatus.constant";
import { CourseEnrollmentDtos } from "src/dto/CouseEnrollmentDtos";
import { USERROLE } from "src/enums/UserRole.enum";

@Injectable()
export class CourseService {
    constructor(
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepositoryInterface,
        @Inject('CourseEditionRepositoryInterface') private courseEditionRepository: CourseEditionRepositoryInterface,
        @Inject('AdminRepositoryInterface') private adminRepository: AdminRepositoryInterface,
        @Inject('CourseEnrollmentRepositoryInterface') private courseEnrollmentRepository: CourseEnrollmentRepositoryInterface
    ) {}

    async createNewCourse(courseInformationDtos: CourseInformationDtos, request: Request) {
        const {teacherInChargeIds, ...courseInformation} = courseInformationDtos;
        
        const admin = await this.adminRepository.findById(request['user'].sub);
        const newCourse = this.courseRepository.create({...courseInformation, createdBy: admin});
        
        await this.courseRepository.save(newCourse);

        teacherInChargeIds.forEach(async id => {
            this.courseEditionRepository.teacherAssignedCourse(id, newCourse);
        })

        return newCourse;
    }

    async getAllAvailableCourses() {
        return await this.courseRepository.findAll(ENTITY_STATUS.AVAILABLE);
    }

    async getUserCourses(request: Request) {
        const userId = request['user'].sub;
        const userRole = request['user'].role;

        let course = null;

        if (userRole === USERROLE.STUDENT) {
            course = await this.courseEnrollmentRepository.getStudentCourses(userId);
        }

        if (userRole === USERROLE.TEACHER) {
            course = await this.courseEditionRepository.getTeacherCourses(userId);
        }

        if (userRole === USERROLE.ADMIN) {
            return await this.getAllAvailableCourses();
        }

        return course;
    }

    async studentEnrollCourse(request: Request, courseEnrollmentDtos: CourseEnrollmentDtos) {
        const studentId = request['user'].sub;

        return this.courseEnrollmentRepository.studentEnrollCourse(studentId, courseEnrollmentDtos);
    }

}
  