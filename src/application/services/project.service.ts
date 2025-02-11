import { IProjectRepository } from '@/domain/interfaces/IProjectRepository';
import { ITaskRepository } from '@/domain/interfaces/ITaskRepository';
import { CreateProjectDto } from '@/infrastructure/http/dtos/create-project.dto';
import { UpdateProjectDto } from '@/infrastructure/http/dtos/update-project.dto';
import { CreateTaskDto } from '@/infrastructure/http/dtos/create-task.dto';
import { UpdateTaskDto } from '@/infrastructure/http/dtos/update-task.dto';
import { Inject } from '@nestjs/common';

export class ProjectService {
    constructor(
        @Inject(IProjectRepository)
        private readonly projectRepository: IProjectRepository,
        @Inject(ITaskRepository)
        private readonly taskRepository: ITaskRepository,
    ) {}

    async getAllProjects() {
        return await this.projectRepository.findAll();
    }

    async getOneProject(id: string) {
        return await this.projectRepository.findOne({ where: { id } });
    }

    async createProject(data: CreateProjectDto) {
        const newProject = { ...data, completed: false };
        return await this.projectRepository.create(newProject);
    }

    async updateProject(id: string, data: UpdateProjectDto) {
        const updateResult = await this.projectRepository.update(data, { id });

        return {
            project: updateResult.raw,
            updated: !!updateResult.affected,
        };
    }

    async deleteProject(id: string) {
        return await this.projectRepository.delete(id);
    }

    async getTasks(id: string) {
        const tasks = await this.taskRepository.findAll({
            where: { projectId: id },
        });

        return tasks;
    }
    async createTask(id: string, data: CreateTaskDto) {
        const task = await this.taskRepository.create({
            ...data,
            projectId: id,
        });

        return task;
    }

    async updateTask(id: string, taskId: string, data: UpdateTaskDto) {
        const updateResult = await this.taskRepository.update(data, {
            projectId: id,
            id: taskId,
        });

        return {
            task: updateResult.raw,
            updated: !!updateResult.affected,
        };
    }

    async deleteTask(id: string, taskId: string) {
        return await this.taskRepository.delete(taskId);
    }
}
