import User from "src/entity/User.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository extends BaseRepositoryAbstract<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }
}