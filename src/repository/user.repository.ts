import User from "src/entity/User.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@nestjs/common";

export class UserRepository extends BaseRepositoryAbstract<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.findOneBy({email})
    }
}