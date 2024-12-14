import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTagEntity } from '@/domain/entities/task-tag.entity';
import { TaskTag } from '../models/task-tag.model';
import { ITaskTagRepository } from '@/domain/interfaces/ITaskTagRepository';

export class TaskTagRepository
    extends BaseRepository<TaskTagEntity, TaskTag>
    implements ITaskTagRepository
{
    constructor(@InjectRepository(TaskTag) repository: Repository<TaskTag>) {
        super(
            { entity: TaskTagEntity, model: TaskTag },
            repository,
            'task_tags'
        );
    }
}
