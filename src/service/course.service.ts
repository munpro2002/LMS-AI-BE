
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { CourseEditionRepositoryInterface } from "src/interface/courseEdition.interface";
import { TeacherRepositoryInterface } from "src/interface/teacher.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { CourseInformationDtos } from "src/dto/CourseInformationDtos";

@Injectable()
export class CourseService {
    constructor(
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepositoryInterface,
        @Inject('CourseEditionRepositoryInterface') private courseEditionRepository: CourseEditionRepositoryInterface,  
        @Inject('TeacherRepositoryInterface') private teacherRepository: TeacherRepositoryInterface,
        @Inject('AdminRepositoryInterface') private adminRepository: AdminRepositoryInterface
    ) {}

    async createNewCourse(courseInformationDtos: CourseInformationDtos) {
        const {teacherInChargeIds, adminId, ...courseInformation} = courseInformationDtos;
        const admin = await this.adminRepository.findById(adminId)
        const newCourse = this.courseRepository.create({...courseInformation, createdBy: admin})
        
        await this.courseRepository.save(newCourse)

        teacherInChargeIds.forEach(async id => {
            const teacher = await this.teacherRepository.findById(id)
            const courseEdition = this.courseEditionRepository.create({teacher: teacher, course: newCourse})

            await this.courseEditionRepository.save(courseEdition)
        })

        return newCourse
    }

    async getAllCourses(status: boolean = true) {
        return await this.courseRepository.findAll(status)
    }
}
  