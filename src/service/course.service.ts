
import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CourseRepositoryInterface } from "src/interface/course.interface";
import { CourseEditionRepositoryInterface } from "src/interface/courseEdition.interface";
import { AdminRepositoryInterface } from "src/interface/admin.interface";
import { StudentRepositoryInterface } from "src/interface/student.interface";
import { CourseInformationDtos } from "src/dto/CourseInformationDtos";
import { CourseEnrollmentRepositoryInterface } from "src/interface/courseEnrollment.interface";
import { MaterialRepositoryInterface } from "src/interface/material.interface";
import { ENTITY_STATUS } from "src/constants/EntityStatus.constant";
import { CourseEnrollmentDtos } from "src/dto/CouseEnrollmentDtos";
import { USERROLE } from "src/enums/UserRole.enum";
import { HttpService } from "@nestjs/axios";
import { StudentAttemptQuizRepositoryInterface } from "src/interface/studentAttemptQuiz.interface";
import { StudentAccessMaterialRepositoryInterface } from "src/interface/studentAccessMaterial.interface";
import { PredictionInformationDtos } from "src/dto/predictionInformationDtos";
import { lastValueFrom, map } from "rxjs";
import { QuizRepositoryInterface } from "src/interface/quiz.interface";

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
        @Inject('MaterialRepositoryInterface') private materialRepository: MaterialRepositoryInterface,      
        @Inject('QuizRepositoryInterface') private quizRepository: QuizRepositoryInterface,      
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
        const userRole = request['user'].userRole;

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
        const courseEnrollmentRecord = await this.courseEnrollmentRepository.findOneBy({student: {id: studentId}, course: {id: courseId}})

        const studentAttemptQuizRecords = await this.studentAttemptQuizRepository.getStudentAttemptQuiz(studentId, courseId);
        const studentAccessMaterialRecords = await this.studentAccessMaterialRepository.getStudentAccessMaterial(studentId, courseId);
        const totalCourseQuizzes = await this.quizRepository.findBy({course: {id: courseId}});

        let inProgressScore = 0;
        let materialList = []; 

        for (let record of studentAttemptQuizRecords) {
            inProgressScore += record.score;
        }

        for (let record of studentAccessMaterialRecords) {
            materialList.push(record.id);
        }

        const predictionPayload: PredictionInformationDtos = {
            id_student: studentId,
            docList: materialList,
            highest_education: student?.highest_education,
            region: student?.region,
            inprogress_score: inProgressScore / totalCourseQuizzes.length * 10,
            date_registration: courseEnrollmentRecord.date_registration,
        }

        const result = await this.coursePredictionProcessing(predictionPayload);

        const {id_site_max_values} = result;
        result.id_site_max_values = await this.materialRepository.getMaterialsByIds(id_site_max_values);

        return result;
    }

    async coursePredictionProcessing(predictionPayload: PredictionInformationDtos) {
        return await lastValueFrom(
            this.httpService.post(`${process.env.AI_SERVER_BASE_URL}/passing_rate_prediction`, predictionPayload).pipe(
                map(res => res.data)
            )
        )
    }
}
  