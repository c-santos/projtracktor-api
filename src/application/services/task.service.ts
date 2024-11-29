import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '@/domain/interfaces/ITaskRepository';
import { CreateTaskDto } from '@/infrastructure/http/dtos/create-task.dto';
import { UpdateTaskDto } from '@/infrastructure/http/dtos/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @Inject(ITaskRepository)
        private readonly taskRepository: ITaskRepository,
    ) {}

    async getAllTasks() {
        return await this.taskRepository.findAll();
    }

    async getOneTask(id: string) {
        return await this.taskRepository.findOne({ where: { id } });
    }

    async createTask(data: CreateTaskDto) {
        return await this.taskRepository.create(data);
    }

    async updateTask(id: string, data: UpdateTaskDto) {
        return await this.taskRepository.update(data, { id });
    }

    async deleteTask(id: string) {
        return await this.taskRepository.delete(id);
    }
}
