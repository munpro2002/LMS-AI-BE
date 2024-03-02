import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/service/user.service';
import { UserRepository } from 'src/repository/user.repository';
import { AdminRepository } from 'src/repository/admin.repository';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { StudentRepository } from 'src/repository/student.repository';
import { UserController } from 'src/controller/user.controller';
import { JwtModule } from '@nestjs/jwt';
import User from 'src/entity/User.entity';
import Admin from 'src/entity/Admin.entity';
import Teacher from 'src/entity/Teacher.entity';
import Student from 'src/entity/Student.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Admin, Teacher ,Student]),
        JwtModule.register({
            global: true,
            secret: `${process.env.JWT_SECRETE_KEY}`,
            signOptions: { expiresIn: '24h' },
          }),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        { provide: 'UserRepositoryInterface', useClass: UserRepository},
        { provide: 'AdminRepositoryInterface', useClass: AdminRepository},
        { provide: 'TeacherRepositoryInterface', useClass: TeacherRepository},
        { provide: 'StudentRepositoryInterface', useClass: StudentRepository},
    ]
})
export class UserModule {}