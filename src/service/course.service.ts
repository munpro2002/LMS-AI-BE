
import { Injectable, Logger } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { CourseEditionRepositoryInterface } from "src/interface/courseEdition.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { CourseInformationDtos } from "src/dto/CourseInformationDtos";
import { CourseEnrollmentRepositoryInterface } from "src/interface/courseEnrollment.interface";
import { ENTITY_STATUS } from "src/constants/EntityStatus.constant";
import { CourseEnrollmentDtos } from "src/dto/CouseEnrollmentDtos";

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

    async getStudentCourses(request: Request) {
        const studentId = request['user'].sub;

        return this.courseEnrollmentRepository.getStudentCourses(studentId);
    }

    async studentEnrollCourse(request: Request, courseEnrollmentDtos: CourseEnrollmentDtos) {
        const studentId = request['user'].sub;

        return this.courseEnrollmentRepository.studentEnrollCourse(studentId, courseEnrollmentDtos);
    }

}
  