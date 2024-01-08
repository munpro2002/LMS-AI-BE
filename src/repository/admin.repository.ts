import Admin from "src/entity/Admin.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class AdminRepository extends BaseRepositoryAbstract<Admin> {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>    
    ) {
        super(adminRepository);
    }
}