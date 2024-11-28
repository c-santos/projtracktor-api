import { PaginationOptions } from '../../types/pagination-options.type';
import { SelectQueryBuilder } from 'typeorm';

export function applyPagination<DatabaseModel>(
    queryBuilder: SelectQueryBuilder<DatabaseModel>,
    options: PaginationOptions,
) {
    if (options?.skip) queryBuilder.skip(options.skip);
    if (options?.take) queryBuilder.take(options.take);
}
