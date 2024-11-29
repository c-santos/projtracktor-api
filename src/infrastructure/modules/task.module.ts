import { Module } from '@nestjs/common';
import { TaskController } from '../http/controllers/task.controller';
import { TaskService } from '@/application/services/task.service';
import { TaskRepository } from '@/infrastructure/database/repositories/task.repository';
import { ITaskRepository } from '@/domain/interfaces/ITaskRepository';

@Module({
    imports: [],
    providers: [
        {
            provide: ITaskRepository,
            useClass: TaskRepository,
        },
        TaskService,
    ],
    controllers: [TaskController],
    exports: [],
})
export class TaskModule {}
