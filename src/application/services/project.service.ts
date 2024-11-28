import { IProjectRepository } from '@/domain/interfaces/IProjectRepository';
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

    async createProject(data: any) {
        return await this.projectRepository.create(data);
    }
}
