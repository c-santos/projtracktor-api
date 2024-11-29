import { IBaseRepository } from '@/infrastructure/database/interfaces/IBaseRepository';
import { ProjectEntity } from '../entities/project.entity';

export abstract class IProjectRepository extends IBaseRepository<ProjectEntity> {
    abstract delete(id: string): Promise<boolean>
}
