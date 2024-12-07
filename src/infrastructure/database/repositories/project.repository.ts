import { ProjectEntity } from '@/domain/entities/project.entity';
import { BaseRepository } from './base.repository';
import { Project } from '../models/project.model';
import { IProjectRepository } from '@/domain/interfaces/IProjectRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '@/domain/entities/task.entity';

export class ProjectRepository
    extends BaseRepository<ProjectEntity, Project>
    implements IProjectRepository
{
    constructor(@InjectRepository(Project) repository: Repository<Project>) {
        super(
            { entity: ProjectEntity, model: Project },
            repository,
            'projects',
        );
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id: id });
        return !!result.affected;
    }

    async getTasks(id: string): Promise<TaskEntity[]> {
        const project = await this.repository.findOne({
            where: { id },
            relations: { tasks: true },
        });

        if (!project) return []

        return project.tasks.map((task) => TaskEntity.create(task));
    }
}
