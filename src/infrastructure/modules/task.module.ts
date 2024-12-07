import { Module } from '@nestjs/common';
import { TaskController } from '../http/controllers/task.controller';
import { TaskService } from '@/application/services/task.service';
import { TaskRepository } from '@/infrastructure/database/repositories/task.repository';
import { ITaskRepository } from '@/domain/interfaces/ITaskRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../database/models/task.model';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
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
