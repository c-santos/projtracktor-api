import { Module } from '@nestjs/common';
import { TagService } from '@/application/services/tag.service';
import { ProjectTagRepository } from '@/infrastructure/database/repositories/project-tag.repository';
import { IProjectTagRepository } from '@/domain/interfaces/IProjectTagRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTag } from '../database/models/project-tag.model';
import { TaskTag } from '../database/models/task-tag.model';
import { ITaskTagRepository } from '@/domain/interfaces/ITaskTagRepository';
import { TaskTagRepository } from '../database/repositories/task-tag.repository';
import { TagController } from '../http/controllers/tag.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectTag, TaskTag])],
    providers: [
        {
            provide: IProjectTagRepository,
            useClass: ProjectTagRepository,
        },
        {
            provide: ITaskTagRepository,
            useClass: TaskTagRepository,
        },
        TagService,
    ],
    controllers: [TagController],
    exports: [],
})
export class TagModule {}
