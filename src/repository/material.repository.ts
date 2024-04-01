import Material from "src/entity/Material.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class MaterialRepository extends BaseRepositoryAbstract<Material> {
    constructor(
        @InjectRepository(Material)
        private readonly MaterialRepository: Repository<Material>    
    ) {
        super(MaterialRepository);
    }
}