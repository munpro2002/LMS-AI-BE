import Student from "src/entity/Student.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class StudentRepository extends BaseRepositoryAbstract<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {
        super(studentRepository);
    }
}