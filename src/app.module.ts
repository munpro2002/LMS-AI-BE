import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user.module';
import { CourseModule } from './module/course.module';
import { PaymentModule } from './module/payment.module';
import { Course } from './entity/Course.entity';
import { CourseEnrollment } from './entity/StudentEnrollCourse.entity';
import { CourseEdition } from './entity/TeacherEditCourse.entity';
import { Student } from './entity/Student.entity';
import { Teacher } from './entity/Teacher.entity';
import { Admin } from './entity/Admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'duyanpro123',
      database: 'ailms',
      entities: [Course, Student, CourseEnrollment, CourseEdition, Teacher, Admin],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule, CourseModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
