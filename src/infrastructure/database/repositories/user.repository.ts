import { UserEntity } from '@/domain/entities/user.entity';
import { BaseRepository } from './base.repository';
import { User } from '../models/user.model';
import { IUserRepository } from '@/domain/interfaces/IUserRepository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository
    extends BaseRepository<UserEntity, User>
    implements IUserRepository
{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super({ entity: UserEntity, model: User }, userRepository, 'users');
    }
}
