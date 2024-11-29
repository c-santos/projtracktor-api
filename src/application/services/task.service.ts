import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '@/domain/interfaces/ITaskRepository';

@Injectable()
export class TaskService {
    constructor(
        @Inject(ITaskRepository)
        private readonly taskRepository: ITaskRepository,
    ) {}
}
