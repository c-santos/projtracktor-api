import { JoinOptions } from '../../types/join-options.type';
import { SelectQueryBuilder } from 'typeorm';
import { applyWhereConditions } from './applyWhereConditions';

export function applyJoins<Entity, DatabaseModel>(
    tableAlias: string,
    queryBuilder: SelectQueryBuilder<DatabaseModel>,
    joins: JoinOptions<Entity>[],
) {
    let joinType = '';
    if (!joins.length) return;

    for (const join of joins) {
        switch (join.type) {
            case 'inner':
                joinType = 'innerJoinAndSelect';
                break;
            case 'left':
                joinType = 'leftJoinAndSelect';
                break;
            default:
                joinType = 'leftJoinAndSelect';
                break;
        }

        queryBuilder[joinType](`${tableAlias}.${String(join.on)}`, join.alias);

        if (join.where) {
            applyWhereConditions<Entity, DatabaseModel>(
                join.alias,
                queryBuilder,
                join.where,
            );
        }

        // :: Recursively call this function
        if (join.join) {
            applyJoins<Entity, DatabaseModel>(
                join.alias,
                queryBuilder,
                join.join,
            );
        }
    }
}
