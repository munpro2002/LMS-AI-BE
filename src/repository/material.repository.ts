import Material from "src/entity/Material.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { Repository, } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class MaterialRepository extends BaseRepositoryAbstract<Material> {
    constructor(
        @InjectRepository(Material)
        private readonly materialRepository: Repository<Material>    
    ) {
        super(materialRepository);
    }

    async getMaterialsByIds(ids: number[]) {
        return this.materialRepository.createQueryBuilder('Material')
                .where('Material.Id IN (:ids)', {ids})
                .getMany()
    }
}