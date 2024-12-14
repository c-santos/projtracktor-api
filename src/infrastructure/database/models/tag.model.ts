import { BaseModel } from './base.model';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { TaskTag } from './task-tag.model';
import { ProjectTag } from './project-tag.model';

@Entity('tag')
export class Tag extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;

    @OneToMany(() => TaskTag, (taskTag) => taskTag.tagId, { nullable: true })
    tasks: TaskTag[];

    @OneToMany(() => ProjectTag, (projTag) => projTag.projectId, {
        nullable: true,
    })
    projects: ProjectTag[];
}
