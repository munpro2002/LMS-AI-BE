import Lesson from 'src/entity/Lesson.entity';
import { BaseRepositoryInterface } from 'src/repository/base/base.interface.repository';

export interface LessonRepositoryInterface
    extends BaseRepositoryInterface<Lesson> {}