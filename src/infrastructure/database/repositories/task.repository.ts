import { ITaskRepository } from '@/domain/interfaces/ITaskRepository';
import { BaseRepository } from './base.repository';
import { TaskEntity } from '@/domain/entities/task.entity';
import { Task } from '@/infrastructure/database/models/task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TaskRepository
    extends BaseRepository<TaskEntity, Task>
    implements ITaskRepository
{
    constructor(@InjectRepository(Task) repository: Repository<Task>) {
        super({ entity: TaskEntity, model: Task }, repository, 'tasks');
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id });
        return !!result.affected;
    }
}
