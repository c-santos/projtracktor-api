import { IBaseRepository } from "@/infrastructure/database/interfaces/IBaseRepository";
import { TaskTagEntity } from "../entities/task-tag.entity";

export abstract class ITaskTagRepository extends IBaseRepository<TaskTagEntity> {}
