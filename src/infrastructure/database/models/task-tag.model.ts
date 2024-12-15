import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './base.model';
import { Task } from './task.model';

@Entity('task_tags')
export class TaskTag extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Task, (task) => task.id, {
        cascade: true,
    })
    @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
    taskId: string;
}
