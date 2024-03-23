import Admin from "src/entity/Admin.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInformationDto } from "src/dto/UserInfomationDtos";

export class AdminRepository extends BaseRepositoryAbstract<Admin> {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>    
    ) {
        super(adminRepository);
    }

    async createNewAdmin(userInformationDto: UserInformationDto): Promise<Admin> {
        const newAdmin = this.create(userInformationDto);
    
        return await this.save(newAdmin);
    }
}