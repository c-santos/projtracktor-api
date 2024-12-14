import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Task } from './task.model';
import { ProjectTag } from './project-tag.model';

@Entity('projects')
export class Project extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean' })
    completed: boolean;

    @OneToMany(() => Task, (task) => task.projectId)
    tasks: Task[];

    @OneToMany(() => ProjectTag, (tag) => tag.projectId)
    tags: ProjectTag[];
}
