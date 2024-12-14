import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Task } from './task.model';
import { Tag } from './tag.model';

@Entity('task_tags')
export class TaskTag extends BaseModel {
    @PrimaryColumn({ name: 'task_id' })
    @ManyToOne(() => Task, (task) => task.id, {
        cascade: true,
    })
    @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
    taskId: string;

    @PrimaryColumn({ name: 'tag_id' })
    @ManyToOne(() => Tag, (tag) => tag.id)
    @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
    tagId: string;
}
