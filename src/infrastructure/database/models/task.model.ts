import { TaskEntity } from '@/domain/entities/task.entity';
import { BaseModel } from './base.model';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { TaskPriority } from '@/domain/enums/task-priority.enum';

@Entity('tasks')
export class Task extends BaseModel implements TaskEntity {
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

    @Column({ type: 'text' })
    projectId: string;
}

