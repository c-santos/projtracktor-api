import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { ProjectEntity } from '@/domain/entities/project.entity';
import { Task } from './task.model';

@Entity('projects')
export class Project extends BaseModel implements ProjectEntity {
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
}
