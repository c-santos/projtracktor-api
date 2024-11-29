import { TaskPriority } from '../enums/task-priority.enum';
import { ProjectEntity } from './project.entity';

export class TaskEntity {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    priority: TaskPriority;

    projectId: ProjectEntity['id'];

    private constructor(data: Partial<TaskEntity>) {
        Object.assign(this, data);
    }

    static create(data: Partial<TaskEntity>): TaskEntity {
        return new TaskEntity(data);
    }
}
