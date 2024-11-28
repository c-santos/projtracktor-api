import { FindOptions } from '../../types/find-options.type';
import { WhereOperators } from '../../types/where-operator.type';
import {
    DeleteQueryBuilder,
    SelectQueryBuilder,
    UpdateQueryBuilder,
} from 'typeorm';

export function applyWhereConditions<Entity, DatabaseModel>(
    alias: string,
    queryBuilder:
        | SelectQueryBuilder<DatabaseModel>
        | UpdateQueryBuilder<DatabaseModel>
        | DeleteQueryBuilder<DatabaseModel>,
    where: string | FindOptions<Entity>,
) {
    if (!Object.entries(where).length) return;

    if (typeof where === 'string') {
        queryBuilder.andWhere(`${alias}.id = :id`, { id: where });
    } else {
        (
            Object.entries(where) as Array<
                [keyof Entity, WhereOperators | boolean | string | number]
            >
        ).forEach(([key, value]) => {
            if (
                typeof value === 'boolean' ||
                typeof value === 'string' ||
                typeof value === 'number'
            ) {
                queryBuilder.andWhere(
                    `${alias}."${String(key)}" = :${String(key)}`,
                    {
                        [key]: value,
                    },
                );
            } else {
                if (value?.notIn) {
                    queryBuilder.andWhere(
                        `${alias}."${String(key)}" NOT IN (:...${String(key)})`,
                        {
                            [key]: value.notIn,
                        },
                    );
                }
                if (value?.greaterThan) {
                    queryBuilder.andWhere(
                        `${alias}."${String(key)}" > :${String(key)}`,
                        {
                            [key]: value.greaterThan,
                        },
                    );
                }
                if (value?.lessThan) {
                    queryBuilder.andWhere(
                        `${alias}."${String(key)}" < :${String(key)}`,
                        {
                            [key]: value.lessThan,
                        },
                    );
                }
                if (value?.in) {
                    queryBuilder.andWhere(
                        `${alias}."${String(key)}" IN (:...${String(key)})`,
                        {
                            [key]: value.in,
                        },
                    );
                }
                if (value?.like) {
                    queryBuilder.andWhere(
                        `${alias}."${String(key)}" LIKE :${String(key)}`,
                        {
                            [key]: value.like,
                        },
                    );
                }

                if (value?.between) {
                    queryBuilder.andWhere(
                        `${alias}.${String(key)} BETWEEN :min AND :max`,
                        {
                            min: value.between[0],
                            max: value.between[1],
                        },
                    );
                }
            }
        });
    }
}
