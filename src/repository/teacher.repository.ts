import Teacher from "src/entity/Teacher.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class TeacherRepository extends BaseRepositoryAbstract<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) {
        super(teacherRepository);
    }
}