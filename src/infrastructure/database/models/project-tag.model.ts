import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Project } from './project.model';
import { Tag } from './tag.model';

@Entity('project_tags')
export class ProjectTag extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column(() => Tag)
    tag: Tag;

    @PrimaryColumn({ name: 'project_id' })
    @ManyToOne(() => Project, (project) => project.id, {
        cascade: true,
    })
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    projectId: string;
}
