import { BaseModel } from './base.model';
import {
    Column,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Entity } from 'typeorm';
import { TaskPriority } from '@/domain/enums/task-priority.enum';
import { Project } from './project.model';
import { ProjectEntity } from '@/domain/entities/project.entity';
import { Tag } from './tag.model';

@Entity('tasks')
export class Task extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', default: true, nullable: false })
    completed: boolean;

    @Column({ type: 'enum', enum: TaskPriority, nullable: true })
    priority: TaskPriority;

    @ManyToOne(() => Project, (proj) => proj.tasks)
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    projectId: ProjectEntity['id'];

    @ManyToMany(() => Tag, (tag) => tag.tasks)
    @JoinTable({
        joinColumn: {
            name: 'task',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag',
            referencedColumnName: 'id',
        },
        name: 'task_tags',
    })
    tags: Tag[];
}
