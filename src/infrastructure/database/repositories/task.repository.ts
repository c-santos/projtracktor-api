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

    async getProjectTasks(
        projectId: string,
        parameters?: {
            sortBy?: string;
            sortOrder?: 'DESC' | 'ASC';
            searchBy?: string;
            searchValue?: string;
        },
    ): Promise<TaskEntity[]> {
        const { sortOrder, sortBy, searchValue, searchBy } = parameters;
        console.log('searchBy: ', searchBy);
        console.log('searchValue: ', searchValue);

        const qb = this.repository
            .createQueryBuilder('tasks')
            .where('tasks.project_id = :projectId', { projectId });

        if (sortBy && sortOrder) {
            qb.orderBy(sortBy, sortOrder);
        }

        if (searchBy && searchValue) {
            qb.andWhere(`tasks.${searchBy} ILIKE :searchValue`, {
                searchValue: `%${searchValue}%`,
            });
        }

        const tasks = await qb.getMany();

        return tasks.map((task) => TaskEntity.create(task));
    }
}
