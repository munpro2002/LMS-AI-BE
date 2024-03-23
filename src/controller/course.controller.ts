import { Body, Post, Get, Controller, Req } from '@nestjs/common';
import { CourseService } from 'src/service/course.service';
import { CourseInformationDtos } from 'src/dto/CourseInformationDtos';
@Controller('api/v1/course/')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Post('course_create')
    createCourseController(@Req() request: Request, @Body() courseInformationDtos: CourseInformationDtos) {
        return this.courseService.createNewCourse(courseInformationDtos, request);
    }

    @Get('course_get_all')
    getAllCourseController() {
        return this.courseService.getAllAvailableCourses();
    }
}
