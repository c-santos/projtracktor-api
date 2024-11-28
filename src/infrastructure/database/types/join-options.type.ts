import { FindOptions } from './find-options.type';

export type JoinOptions<Entity> = {
    alias: string;
    on?: keyof Entity;
    where?: FindOptions<any> | string;
    join?: JoinOptions<any>[];
    type?: 'inner' | 'left';
};
