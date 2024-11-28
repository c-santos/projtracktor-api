import { ProjectService } from '@/application/services/project.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

@Controller('projects')
export class ProjectController {
    constructor(
        @Inject(ProjectService) private readonly projectService: ProjectService,
    ) {}

    @Get()
    async getAllProjects() {
        return await this.projectService.getAllProjects();
    }

    @Get('/:id')
    async getOneProjects(@Param('id') id: string) {
        return await this.projectService.getOneProject(id);
    }

    @Post()
    async createProject(@Body() data: any) {
        return await this.projectService.createProject(data);
    }
}
