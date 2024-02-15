import Student from "src/entity/Student.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInformationDto } from "src/dto/UserInfomationDtos";

export class StudentRepository extends BaseRepositoryAbstract<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {
        super(studentRepository);
    }

    async createNewStudent(userInformationDto: UserInformationDto): Promise<Student> {
        const newStudent = this.create(userInformationDto);

        return await this.save(newStudent);

    }
}