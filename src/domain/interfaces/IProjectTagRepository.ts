import { IBaseRepository } from "@/infrastructure/database/interfaces/IBaseRepository";
import { ProjectTagEntity } from "../entities/project-tag.entity";

export abstract class IProjectTagRepository extends IBaseRepository<ProjectTagEntity> {}
