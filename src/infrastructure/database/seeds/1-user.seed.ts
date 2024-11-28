import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../models/user.model';
import { v4 as uuid } from 'uuid';

export class UserSeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const users: User[] = [
            {
                id: uuid(),
                email: 'swag@gmail.com',
                firstName: 'Swag',
                lastName: 'Man',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await dataSource.createEntityManager().save<User>(users);
    }
}
