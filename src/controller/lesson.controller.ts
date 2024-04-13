import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LessonInformationDtos } from 'src/dto/SectionInformationDtos';
import { LessonService } from 'src/service/lesson.service';

@Controller('api/v1/lesson')
export class LessonController {
    constructor(private lessonService: LessonService) {}

    @Post('save_lesson')
    saveLessonController(@Body() lessonInformationDtos: LessonInformationDtos) {
        return this.lessonService.saveLesson(lessonInformationDtos);
    }
    
    @Delete('delete_lesson/:id') 
    deleteLessonController(@Param('id') id: number) {
        return this.lessonService.deleteLesson(id);
    }
}