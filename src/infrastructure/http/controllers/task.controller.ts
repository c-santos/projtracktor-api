import { Controller } from '@nestjs/common';
import { TaskService } from '@/application/services/task.service';
import { Inject } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
    constructor(@Inject(TaskService) taskService: TaskService) {}
}
