import { configService } from '@/infrastructure/config/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

const entities = join(__dirname, '..', 'database/models/*.model.{ts,js}');
const migrations = join(__dirname, '..', 'database/migrations/*.{ts,js}');

export const dbConfig: DataSourceOptions = {
    logging: 'all',
    type: 'postgres',
    host: configService.getValue('DB_HOST'),
    port: Number(configService.getValue('DB_PORT')) || 5432,
    username: configService.getValue('DB_USER'),
    password: configService.getValue('DB_PASSWORD'),
    database: configService.getValue('DB_NAME'),
    entities: [entities], // Change this path if necessary
    migrations: [migrations],
    synchronize: false,
};

export const dbDataSource = new DataSource(dbConfig);
