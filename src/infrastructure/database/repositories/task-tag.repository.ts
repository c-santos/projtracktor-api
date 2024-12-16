import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITagRepository } from '@/domain/interfaces/ITagRepository';
import { TagEntity } from '@/domain/entities/tag.entity';
import { Tag } from '../models/tag.model';

export class TaskTagRepository
    extends BaseRepository<TagEntity, Tag>
    implements ITagRepository
{
    constructor(@InjectRepository(Tag) repository: Repository<Tag>) {
        super({ entity: TagEntity, model: Tag }, repository, 'task_tags');
    }
}
