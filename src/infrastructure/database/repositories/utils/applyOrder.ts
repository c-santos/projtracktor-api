import { OrderByOptions } from '../../types/order-by-options.type';
import { SelectQueryBuilder } from 'typeorm';

export function applyOrder<Entity, DatabaseModel>(
    alias: string,
    queryBuilder: SelectQueryBuilder<DatabaseModel>,
    orderBy: OrderByOptions<Entity>,
) {
    const orderByStatement = {};

    for (const key in orderBy) {
        orderByStatement[`${alias}.${String(key)}`] = orderBy[key];
    }

    queryBuilder.orderBy(orderByStatement);
}
