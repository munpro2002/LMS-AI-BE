import Quiz from 'src/entity/Quiz.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface QuizRepositoryInterface
    extends BaseRepositoryInterface<Quiz> {}