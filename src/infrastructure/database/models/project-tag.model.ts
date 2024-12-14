import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Tag } from './tag.model';
import { Project } from './project.model';

@Entity('project_tags')
export class ProjectTag extends BaseModel {
    @PrimaryColumn({ name: 'project_id' })
    @ManyToOne(() => Project, (project) => project.id, {
        cascade: true,
    })
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    projectId: string;

    @PrimaryColumn({ name: 'tag_id' })
    @ManyToOne(() => Tag, (tag) => tag.id)
    @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
    tagId: string;
}
