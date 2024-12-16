import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './base.model';
import { Task } from './task.model';
import { Tag } from './tag.model';

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

    @ManyToMany(() => Tag, (tag) => tag.projects)
    @JoinTable({
        joinColumn: {
            name: 'project',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag',
            referencedColumnName: 'id',
        },
        name: 'project_tags',
    })
    tags: Tag[];
}
