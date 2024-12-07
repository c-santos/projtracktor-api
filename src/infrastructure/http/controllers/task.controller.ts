import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TaskService } from '@/application/services/task.service';
import { Inject } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(@Inject(TaskService) private taskService: TaskService) {}

    @Get()
    async getAllTasks() {
        return await this.taskService.getAllTasks();
    }

    @Get('/:id')
    async getOneTask(@Param('id') id: string) {
        return await this.taskService.getOneTask(id);
    }

    @Post()
    async createTask(@Body() data: CreateTaskDto) {
        return await this.taskService.createTask(data);
    }

    @Patch('/:id')
    async updateTask(@Param('id') id: string, @Body() data: CreateTaskDto) {
        return await this.taskService.updateTask(id, data);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string) {
        return await this.taskService.deleteTask(id);
    }
}
