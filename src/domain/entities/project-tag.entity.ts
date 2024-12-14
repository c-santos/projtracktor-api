import { ProjectEntity } from './project.entity';

export class ProjectTagEntity {
    id: string;
    name: string;
    projects?: ProjectEntity[];

    private constructor(data: Partial<ProjectTagEntity>) {
        Object.assign(this, data);
    }

    static create(data: Partial<ProjectTagEntity>): ProjectTagEntity {
        return new ProjectTagEntity(data);
    }
}
