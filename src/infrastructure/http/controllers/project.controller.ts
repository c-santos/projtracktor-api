import { ProjectService } from '@/application/services/project.service';
import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';

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
    async createProject(@Body() data: CreateProjectDto) {
        return await this.projectService.createProject(data);
    }

    @Patch('/:id')
    async updateProject(@Param('id') id: string, @Body() data: UpdateProjectDto) {
        return await this.projectService.updateProject(id, data)
    }
}
