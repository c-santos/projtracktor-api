import { Injectable, Inject } from '@nestjs/common';
import { IProjectTagRepository } from '@/domain/interfaces/IProjectTagRepository';
import { ITaskTagRepository } from '@/domain/interfaces/ITaskTagRepository';
import { BaseService } from './base.service';

@Injectable()
export class TagService extends BaseService {
    constructor(
        @Inject(IProjectTagRepository)
        private readonly projectTagRepo: IProjectTagRepository,
        @Inject(ITaskTagRepository)
        private readonly taskTagRepo: ITaskTagRepository,
    ) {
        super(TagService.name);
    }

    async getAllTaskTags() {
        return await this.taskTagRepo.findAll();
    }

    async getAllProjectTags() {
        return await this.projectTagRepo.findAll();
    }

}

