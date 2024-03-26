import { Controller, Post, Body, Get } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { SectionInformationDtos } from 'src/dto/SectionInformationDtos';
import { SectionService } from 'src/service/section.service';

@Controller('api/v1/section/')
export class SectionController {
    constructor(private sectionService: SectionService) {}

    @Public()
    @Post('create_section')
    verifyUserLoginController(@Body() sectionInformationDtos: SectionInformationDtos) {
        return this.sectionService.createSection(sectionInformationDtos);
    }

    @Public()
    @Get('get_course_sections')
    getCourseSectionsController(courseId: number) {
        return this.sectionService.getCourseSections(courseId);
    }
}
