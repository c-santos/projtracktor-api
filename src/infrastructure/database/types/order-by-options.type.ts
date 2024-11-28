import { OrderByEnum } from '../enums/order-by.enum';

export type OrderByOptions<Entity> = {
    [P in keyof Entity]?: OrderByEnum;
};
