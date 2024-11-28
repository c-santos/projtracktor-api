import { IBaseRepository } from '@/infrastructure/database/interfaces/IBaseRepository';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository extends IBaseRepository<UserEntity> {}
