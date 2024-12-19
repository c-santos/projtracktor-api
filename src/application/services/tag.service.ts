import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from './base.service';
import { TagRepository } from '@/infrastructure/database/repositories/tag.repository';
import { FindOptions } from '@/infrastructure/database/types/find-options.type';
import { TagEntity } from '@/domain/entities/tag.entity';

@Injectable()
export class TagService extends BaseService {
    constructor(
        @Inject(TagRepository)
        private readonly tagRepo: TagRepository,
    ) {
        super(TagService.name);
    }

    async getAllTags(
        filter?: FindOptions<TagEntity>,
        sortBy?: keyof TagEntity,
        sortOrder?: 'ASC' | 'DESC',
        take?: number,
        skip?: number,
    ) {
        let sort: Record<string, string>;
        sort[sortBy] = sortOrder;

        const tags = await this.tagRepo.findAll({
            where: filter,
            orderBy: sort,
            pagination: { take, skip },
        });

        this.logger.log(tags);
        return tags;
    }

    async getProjectTags(projectId: string) {
        const tags = await this.tagRepo.findProjectTags(projectId);
        this.logger.log(tags);
        return tags;
    }

    async getTaskTags(taskId: string) {
        const tags = await this.tagRepo.findTaskTags(taskId);
        this.logger.log(tags);
        return tags;
    }
}
