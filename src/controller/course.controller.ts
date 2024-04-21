import { Body, Post, Get, Controller, Req, Param } from '@nestjs/common';
import { CourseService } from 'src/service/course.service';
import { CourseInformationDtos } from 'src/dto/CourseInformationDtos';
import { Public } from 'src/decorator/public.decorator';
import { CourseEnrollmentDtos } from 'src/dto/CouseEnrollmentDtos';
@Controller('api/v1/course/')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Post('course_create')
    createCourseController(@Req() request: Request, @Body() courseInformationDtos: CourseInformationDtos) {
        return this.courseService.createNewCourse(courseInformationDtos, request);
    }

    @Public()
    @Get('course_get_all')
    getAllCourseController() {
        return this.courseService.getAllAvailableCourses();
    }

    @Get('get_user_courses')
    getUserCoursesController(@Req() request: Request) {
        return this.courseService.getUserCourses(request);
    }

    @Post('student_enroll_course')
    studentEnrollCourseController(@Req() request: Request, @Body() courseEnrollmentDtos: CourseEnrollmentDtos) {
        return this.courseService.studentEnrollCourse(request, courseEnrollmentDtos);
    }

    @Get('course_pass_prediction/:id')
    getCoursePassingRatePredictionController(@Param('id') courseId: number, @Req() request: Request){
        return this.courseService.coursePassingRatePrediction(request, courseId);
    }
}
