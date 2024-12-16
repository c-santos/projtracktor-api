import { BaseRepository } from './base.repository';
import { TagEntity } from '@/domain/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITagRepository } from '@/domain/interfaces/ITagRepository';
import { Tag } from '../models/tag.model';

export class TagRepository
    extends BaseRepository<TagEntity, Tag>
    implements ITagRepository
{
    constructor(@InjectRepository(Tag) repository: Repository<Tag>) {
        super({ entity: TagEntity, model: Tag }, repository, 'tags');
    }

    async findProjectTags(projectId: string) {
        const tags = await this.repository
            .createQueryBuilder()
            .relation(Tag, 'projects')
            .of(projectId)
            .loadMany();
        console.log(tags);

        return tags.map((tag) => TagEntity.create(tag));
    }

    async findTaskTags(taskId: string) {
        const tags = await this.repository
            .createQueryBuilder('task_tags')
            .where('taskId = :taskId', { taskId: taskId })
            .getMany();
        console.log(tags);

        return tags.map((tag) => TagEntity.create(tag));
    }
}
