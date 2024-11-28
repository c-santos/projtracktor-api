import {
    SelectQueryBuilder,
    UpdateQueryBuilder,
    DeleteQueryBuilder,
} from 'typeorm';

export function applySelectAttributes<Entity, DatabaseModel>(
    alias: string,
    queryBuilder:
        | SelectQueryBuilder<DatabaseModel>
        | UpdateQueryBuilder<DatabaseModel>
        | DeleteQueryBuilder<DatabaseModel>,
    attributes: Array<keyof Entity>,
) {
    const selectStatement: string[] = [];

    if (attributes.length) {
        for (const attribute of attributes) {
            selectStatement.push(`${alias}.${String(attribute)}`);
        }

        queryBuilder.select(selectStatement);
    }
}
