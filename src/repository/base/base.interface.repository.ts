import { DeepPartial, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface BaseRepositoryInterface<T> {
    create(dto: DeepPartial<T>): T;

    findById(id: number): Promise<T>;

    findBy(
        conditions: object,
        entities: Array<string>
    ): Promise<T[]>;

    findOneBy(
        filter: object
    ): Promise<T>;

    findAll(
        status: boolean
    ): Promise<T[]>;

    update(id: string, dto: QueryDeepPartialEntity<T>): Promise<UpdateResult>;

    save(dto: DeepPartial<T>): Promise<T>;
}