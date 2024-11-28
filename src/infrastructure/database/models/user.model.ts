import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { UserEntity } from '@/domain/entities/user.entity';

@Entity('users')
export class User extends BaseModel implements UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'text' })
    firstName: string;

    @Column({ name: 'last_name', type: 'text' })
    lastName: string;

    @Column({ type: 'text' })
    email: string;
}
