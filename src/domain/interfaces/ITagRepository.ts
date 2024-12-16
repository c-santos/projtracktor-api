import { IBaseRepository } from "@/infrastructure/database/interfaces/IBaseRepository";
import { TagEntity } from "../entities/tag.entity";

export abstract class ITagRepository extends IBaseRepository<TagEntity> {}
