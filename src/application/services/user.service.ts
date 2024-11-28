import { Inject } from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateUserDto } from '@/infrastructure/http/dtos/create-user.dto';
import { IUserRepository } from '@/domain/interfaces/IUserRepository';
import { DataSource } from 'typeorm';

export class UserService extends BaseService {
    constructor(
        @Inject(IUserRepository) private userRepository: IUserRepository,
        // Inject DataSource to instantiate queryRunner
        @Inject(DataSource) private dataSource: DataSource,
    ) {
        super(UserService.name);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getOneUser(id: string) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async createUser(data: CreateUserDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();
        try {

            // some error-causing logic
            if (data.email.startsWith('@')) {
                throw new Error("email can't start with @");
            }

            await this.userRepository.create(data, queryRunner);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
