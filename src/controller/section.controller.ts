import { Controller, Post, Body, Get, Query, Param, Delete } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { SectionInformationDtos } from 'src/dto/SectionInformationDtos';
import { SectionService } from 'src/service/section.service';

@Controller('api/v1/section/')
export class SectionController {
    constructor(private sectionService: SectionService) {}

    @Public()
    @Post('save_section')
    saveSectionController(@Body() sectionInformationDtos: SectionInformationDtos) {
        return this.sectionService.saveSection(sectionInformationDtos);
    }

    @Public()
    @Delete('delete_section/:id')
    deleteSectionController(@Param('id') id: number) {
        return this.sectionService.deleteSection(id);
    }

    @Public()
    @Get('get_course_sections/?')
    getCourseSectionsController(@Query('courseId') courseId: number) {
        return this.sectionService.getCourseSections(courseId);
    }
}
