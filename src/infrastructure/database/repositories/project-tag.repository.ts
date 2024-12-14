import { IProjectTagRepository } from '@/domain/interfaces/IProjectTagRepository';
import { BaseRepository } from './base.repository';
import { ProjectTagEntity } from '@/domain/entities/project-tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTag } from '../models/project-tag.model';

export class ProjectTagRepository
    extends BaseRepository<ProjectTagEntity, ProjectTag>
    implements IProjectTagRepository
{
    constructor(
        @InjectRepository(ProjectTag) repository: Repository<ProjectTag>,
    ) {
        super(
            { entity: ProjectTagEntity, model: ProjectTag },
            repository,
            'project_tags',
        );
    }
}
