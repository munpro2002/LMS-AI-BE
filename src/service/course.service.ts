
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { CourseEditionRepositoryInterface } from "src/interface/courseEdition.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { StudentRepositoryInterface } from "src/interface/student.interface";
import { CourseInformationDtos } from "src/dto/CourseInformationDtos";
import { CourseEnrollmentRepositoryInterface } from "src/interface/courseEnrollment.interface";
import { ENTITY_STATUS } from "src/constants/EntityStatus.constant";
import { CourseEnrollmentDtos } from "src/dto/CouseEnrollmentDtos";
import { USERROLE } from "src/enums/UserRole.enum";
import { HttpService } from "@nestjs/axios";
import { SectionService } from "./section.service";
import { StudentAttemptQuizRepositoryInterface } from "src/interface/studentAttemptQuiz.interface";
import { StudentAccessMaterialRepositoryInterface } from "src/interface/studentAccessMaterial.interface";
import { PredictionInformationDtos } from "src/dto/predictionInformationDtos";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class CourseService {
    constructor(
        @Inject('CourseRepositoryInterface') private courseRepository: CourseRepositoryInterface,
        @Inject('CourseEditionRepositoryInterface') private courseEditionRepository: CourseEditionRepositoryInterface,
        @Inject('AdminRepositoryInterface') private adminRepository: AdminRepositoryInterface,
        @Inject('StudentRepositoryInterface') private studentRepository: StudentRepositoryInterface,
        @Inject('CourseEnrollmentRepositoryInterface') private courseEnrollmentRepository: CourseEnrollmentRepositoryInterface,
        @Inject('StudentAttemptQuizRepositoryInterface') private studentAttemptQuizRepository: StudentAttemptQuizRepositoryInterface,
        @Inject('StudentAccessMaterialRepositoryInterface') private studentAccessMaterialRepository: StudentAccessMaterialRepositoryInterface,      
        private readonly sectionService: SectionService,
        private readonly httpService: HttpService

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

    async coursePassingRatePrediction(request: Request, courseId: number) {
        const studentId = request['user'].sub;
        const student = await this.studentRepository.findById(studentId);
        const course = await this.courseRepository.findById(courseId);
        const courseEnrollmentRecord = await this.courseEnrollmentRepository.findOneBy({student, course})

        const courseSections = await this.sectionService.getCourseSections(courseId);

        let inProgressScore = 0;
        let materialList = []; 

        for (let section of courseSections) {
            const {quiz, material} = section;

            for (let singleQuiz of quiz) {
                const studentAttemptQuizRecord = await this.studentAttemptQuizRepository.findOneBy({student, singleQuiz});
                
                inProgressScore += studentAttemptQuizRecord?.score;
            }

            for (let singleMaterial of material) {
                const studentAccessMaterialRecord = await this.studentAccessMaterialRepository.findOneBy({student, singleMaterial});
                
                materialList.push(studentAccessMaterialRecord?.id);
            }
        }

        const predictionPayload: PredictionInformationDtos = {
            material_list: materialList,
            highest_education: student?.highest_education,
            region: student?.region,
            inprogress_score: inProgressScore,
            date_registration: courseEnrollmentRecord.date_registration,
        }

        const result = await this.coursePredictionProcessing(predictionPayload);

        return result;
    }

    async coursePredictionProcessing(predictionPayload: PredictionInformationDtos){
        return await lastValueFrom(
            this.httpService.post(`${process.env.AI_SERVER_BASE_URL}/passing_rate_prediction`, predictionPayload).pipe(
                map(res => res.data)
            )
        )
    }
}
  