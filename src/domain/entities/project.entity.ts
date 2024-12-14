import { TagEntity } from './project-tag.entity';
import { TaskEntity } from './task.entity';

export class ProjectEntity {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;

    tasks?: TaskEntity[];
    tags?: TagEntity[];

    constructor(data: Partial<ProjectEntity>) {
        Object.assign(this, data);
    }

    static create(data: Partial<ProjectEntity>) {
        return new ProjectEntity(data);
    }
}
