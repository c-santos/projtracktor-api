import { WhereOperators } from './where-operator.type';

export type FindOptions<Entity> = {
    [P in keyof Entity]?: NonNullable<Entity[P]> | WhereOperators;
};
