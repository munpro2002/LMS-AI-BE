import { AppController } from './app.controller';
import { QuizController } from './controller/quiz.controller';
import { LessonController } from './controller/lesson.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user.module';
import { CourseModule } from './module/course.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigAsync } from './config/typeorm.config';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    UserModule,
    CourseModule
  ],
  controllers: [QuizController, LessonController, AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
