import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Project } from './project.model';
import { Task } from './task.model';

export enum TagType {
    PROJECT = 'project',
    TASK = 'task',
}

@Entity('tags')
export class Tag extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: TagType })
    type: TagType;

    @ManyToMany(() => Project, (project) => project.tags)
    projects: Project[];

    @ManyToMany(() => Task, (task) => task.tags)
    tasks: Task[];
}
