import { IProjectRepository } from '@/domain/interfaces/IProjectRepository';
import { CreateProjectDto } from '@/infrastructure/http/dtos/create-project.dto';
import { UpdateProjectDto } from '@/infrastructure/http/dtos/update-project.dto';
import { Inject } from '@nestjs/common';

export class ProjectService {
    constructor(
        @Inject(IProjectRepository)
        private readonly projectRepository: IProjectRepository,
    ) {}

    async getAllProjects() {
        return await this.projectRepository.findAll();
    }

    async getOneProject(id: string) {
        return await this.projectRepository.findOne({ where: { id } });
    }

    async createProject(data: CreateProjectDto) {
        return await this.projectRepository.create(data);
    }

    async updateProject(id: string, data: UpdateProjectDto) {
        const updateResult = await this.projectRepository.update(data, { id });

        return {
            project: updateResult.raw,
            updated: !!updateResult.affected,
        };
    }

    async deleteProject(id: string) {
        return await this.projectRepository.delete(id)
    }
}
