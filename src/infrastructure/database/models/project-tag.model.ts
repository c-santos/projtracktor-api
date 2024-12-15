import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Project } from './project.model';

@Entity('project_tags')
export class ProjectTag extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @PrimaryColumn({ name: 'project_id' })
    @ManyToOne(() => Project, (project) => project.id, {
        cascade: true,
    })
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    projectId: string;
}
