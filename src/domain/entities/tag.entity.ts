import { TagType } from '@/infrastructure/database/models/tag.model';
import { ProjectEntity } from './project.entity';
import { TaskEntity } from './task.entity';

export class TagEntity {
    id: string;
    name: string;
    type: TagType;

    projects?: ProjectEntity[];
    tasks?: TaskEntity[];

    createdAt: Date;
    updatedAt: Date;

    private constructor(data: Partial<TagEntity>) {
        Object.assign(this, data);
    }

    static create(data: Partial<TagEntity>): TagEntity {
        return new TagEntity(data);
    }
}
