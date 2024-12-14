import { TaskEntity } from './task.entity';

export class TaskTagEntity {
    id: string;
    name: string;
    tasks?: TaskEntity[];

    private constructor(data: Partial<TaskTagEntity>) {
        Object.assign(this, data);
    }

    static create(data: Partial<TaskTagEntity>): TaskTagEntity {
        return new TaskTagEntity(data);
    }
}
