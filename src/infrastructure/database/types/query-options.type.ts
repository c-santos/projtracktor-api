import { FindOptions } from './find-options.type';
import { JoinOptions } from './join-options.type';
import { OrderByOptions } from './order-by-options.type';
import { PaginationOptions } from './pagination-options.type';

export type QueryOptions<Entity> = {
    pagination?: PaginationOptions;
    orderBy?: OrderByOptions<Entity>;
    select?: Array<keyof Entity>;
    where?: FindOptions<Entity> | string;
    join?: JoinOptions<Entity>[];
};
