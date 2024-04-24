import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { QuizInformationDtos } from 'src/dto/SectionInformationDtos';
import { UpdateQuizAttempt } from 'src/dto/UpdateQuizAttemptDtos';
import { QuizService } from 'src/service/quiz.service';

@Controller('api/v1/quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Post('save_quiz')
    saveQuizController(@Body() quizInformationDtos: QuizInformationDtos) {
        return this.quizService.saveQuiz(quizInformationDtos);
    }

    @Delete('delete_quiz/:id') 
    deleteQuizController(@Param('id') id: number) {
        return this.quizService.deleteQuiz(id);
    }

    @Post('update_quiz_score/:id')
    updateQuizScoreController(@Param('id') quizId: number, @Req() request: Request, @Body() updateQuizAttempt: UpdateQuizAttempt) {
        const studentId = request['user'].sub;
        const { score } = updateQuizAttempt;

        return this.quizService.updateQuizScore(quizId, studentId, score);
    }
}