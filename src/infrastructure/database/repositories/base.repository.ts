import { Entity, QueryRunner, Repository } from 'typeorm';
import { FindOptions } from '../types/find-options.type';
import { applyWhereConditions } from './utils/applyWhereConditions';
import { QueryOptions } from '../types/query-options.type';
import { applySelectAttributes } from './utils/applySelectAttributes';
import { applyOrder } from './utils/applyOrder';
import { applyPagination } from './utils/applyPagination';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { plainToInstance } from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DatabaseModelStruct } from '../types/database-model-struct.type';
import { applyJoins } from './utils/applyJoins';

export abstract class BaseRepository<
    Entity,
    DatabaseModel extends QueryDeepPartialEntity<DatabaseModel>,
> implements IBaseRepository<Entity>
{
    private _entity;
    private _model: DatabaseModelStruct<DatabaseModel>;
    constructor(
        private _props: {
            entity: { create(...args: any[]) };
            model: DatabaseModelStruct<DatabaseModel>;
        },
        public repository: Repository<DatabaseModel>,
        public tableAlias: string,
    ) {
        this._entity = _props.entity;
        this._model = _props.model;
    }

    async findAll(queryOptions?: QueryOptions<Entity>): Promise<Entity[]> {
        const queryBuilder = this.repository.createQueryBuilder(
            this.tableAlias,
        );
        if (queryOptions?.select) {
            applySelectAttributes<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.select,
            );
        }

        if (queryOptions?.join) {
            applyJoins<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.join,
            );
        }

        if (queryOptions?.where) {
            applyWhereConditions<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.where,
            );
        }

        if (queryOptions?.orderBy) {
            applyOrder<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.orderBy,
            );
        }

        if (queryOptions?.pagination) {
            applyPagination<DatabaseModel>(
                queryBuilder,
                queryOptions.pagination,
            );
        }

        const data = await queryBuilder.getMany();

        return data.map((biller) => this._entity.create(biller));
    }

    async create(
        data: Partial<Entity>,
        queryRunner?: QueryRunner,
    ): Promise<Entity> {
        const databaseModelData = plainToInstance(this._model, data);

        if (queryRunner) {
            const queryBuilder = this.repository.createQueryBuilder(
                this.tableAlias,
                queryRunner,
            );
            const createdEntity = queryBuilder
                .insert()
                .into(this._model)
                .values(databaseModelData)
                .returning('*')
                .execute();
            return this._entity.create(createdEntity);
        }

        const createdEntity = await this.repository.save(databaseModelData);
        return this._entity.create(createdEntity);
    }

    async update(
        data: Partial<Entity>,
        where?: FindOptions<Entity> | string,
        queryRunner?: QueryRunner,
    ): Promise<boolean> {
        const databaseModelData = plainToInstance(this._model, data);
        const queryBuilder = queryRunner
            ? this.repository.createQueryBuilder(this.tableAlias, queryRunner)
            : this.repository.createQueryBuilder(this.tableAlias);

        queryBuilder.update(this._model).set(databaseModelData);

        if (where) {
            applyWhereConditions<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                where,
            );
        }

        const result = await queryBuilder.execute();

        return !!result.affected;
    }

    async findOne(queryOptions?: QueryOptions<Entity>): Promise<Entity> {
        const queryBuilder = this.repository.createQueryBuilder(
            this.tableAlias,
        );

        if (queryOptions?.where) {
            applyWhereConditions<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.where,
            );
        }

        if (queryOptions?.join) {
            applyJoins<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.join,
            );
        }

        if (queryOptions?.select) {
            applySelectAttributes<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.select,
            );
        }

        const data = await queryBuilder.getOne();
        return data ? this._entity.create(data) : null;
    }

    async count(queryOptions?: QueryOptions<Entity>) {
        const queryBuilder = this.repository.createQueryBuilder(
            this.tableAlias,
        );

        if (queryOptions?.where) {
            applyWhereConditions<Entity, DatabaseModel>(
                this.tableAlias,
                queryBuilder,
                queryOptions.where,
            );
        }

        if (queryOptions?.pagination) {
            applyPagination<DatabaseModel>(
                queryBuilder,
                queryOptions.pagination,
            );
        }

        return await queryBuilder.getCount();
    }
}
