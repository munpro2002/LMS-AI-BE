import Teacher from "src/entity/Teacher.entity";
import { Repository } from "typeorm";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInformationDto } from "src/dto/UserInfomationDtos";

export class TeacherRepository extends BaseRepositoryAbstract<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) {
        super(teacherRepository);
    }

    async createNewTeacher(userInformationDto: UserInformationDto): Promise<Teacher> {
        const newTeacher = this.create(userInformationDto);
    
        return await this.save(newTeacher);
    }

    async getAllAvailableTeachers(): Promise<Teacher[]> {
        return await this.findAll();
    }
}