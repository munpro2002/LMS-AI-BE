import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { QuizInformationDtos } from 'src/dto/SectionInformationDtos';
import { QuizService } from 'src/service/quiz.service';

@Controller('api/v1/quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Public()
    @Post('save_quiz')
    saveQuizController(@Body() quizInformationDtos: QuizInformationDtos) {
        return this.quizService.saveQuiz(quizInformationDtos);
    }

    @Public()
    @Delete('delete_quiz/:id') 
    deleteQuizController(@Param('id') id: number) {
        return this.quizService.deleteQuiz(id);
    }
}