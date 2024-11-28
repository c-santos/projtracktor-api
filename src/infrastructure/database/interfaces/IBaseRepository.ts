import { QueryRunner } from 'typeorm';
import { FindOptions } from '../types/find-options.type';
import { QueryOptions } from '../types/query-options.type';

export abstract class IBaseRepository<Entity> {
    abstract findAll(queryOptions?: QueryOptions<Entity>): Promise<Entity[]>;
    abstract create(
        data: Partial<Entity>,
        queryRunner?: QueryRunner,
    ): Promise<Entity>;
    abstract update(
        data: Partial<Entity>,
        where?: FindOptions<Entity> | string,
        queryRunner?: QueryRunner,
    ): Promise<boolean>;
    abstract findOne(queryOptions?: QueryOptions<Entity>): Promise<Entity>;
    abstract count(queryOptions?: QueryOptions<Entity>): Promise<number>;
}
