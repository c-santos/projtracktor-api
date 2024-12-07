import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../database/models/project.model';
import { ProjectRepository } from '../database/repositories/project.repository';
import { IProjectRepository } from '@/domain/interfaces/IProjectRepository';
import { ProjectService } from '@/application/services/project.service';
import { ProjectController } from '../http/controllers/project.controller';
import { TaskModule } from './task.module';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), TaskModule],
    providers: [
        {
            provide: IProjectRepository,
            useClass: ProjectRepository,
        },
        ProjectService,
    ],
    controllers: [ProjectController],
    exports: [ProjectService],
})
export class ProjectModule {}
