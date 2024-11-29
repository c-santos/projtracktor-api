import { IBaseRepository } from '@/infrastructure/database/interfaces/IBaseRepository';
import { TaskEntity } from '../entities/task.entity';

export abstract class ITaskRepository extends IBaseRepository<TaskEntity> {}
