import { Body, Post, Get, Controller, Req } from '@nestjs/common';
import { CourseService } from 'src/service/course.service';
import { CourseInformationDtos } from 'src/dto/CourseInformationDtos';
import { Public } from 'src/decorator/public.decorator';
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

    @Get('get_students_courses')
    getUserCoursesController(@Req() request: Request) {
        return this.courseService.getStudentCourses(request);
    }
}
