import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/models/user.model';
import { UserService } from '@/application/services/user.service';
import { UserController } from '../http/controllers/user.controller';
import { IUserRepository } from '@/domain/interfaces/IUserRepository';
import { UserRepository } from '../database/repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserService,
        { provide: IUserRepository, useClass: UserRepository },
    ],
    controllers: [UserController],
    exports: [],
})
export class UserModule {}
