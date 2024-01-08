import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepositoryInterface } from './base.interface.repository';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import BaseEntity from 'src/entity/base/base.entity';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
    implements BaseRepositoryInterface<T>
{
    private entity: Repository<T>;
    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public create(dto: DeepPartial<T>): T {
        return this.entity.create(dto);
    }

    async findById(id: number): Promise<T> {
        return await this.entity.findOneBy({id: id} as FindOptionsWhere<T>);
    }

    async findBy(
        filter: object
    ): Promise<T[]>{
        return await this.entity.find(filter as FindManyOptions<T>);
    }

    async findAll(
        status: boolean = true
    ): Promise<T[]>{
        return await this.entity.find({status: status} as FindManyOptions<T>);
    }

    async findOneBy(
        filter: object
    ): Promise<T> {
        return await this.entity.findOneBy(filter as FindOptionsWhere<T>);
    }

    async update(id: string, update_dto: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return await this.entity.update(id, update_dto);
    }

    async save(dto: DeepPartial<T>): Promise<T> {
        return await this.entity.save(dto);
    }
}