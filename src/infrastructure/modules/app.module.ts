import { Module } from '@nestjs/common';
import { AppController } from '../http/controllers/app.controller';
import { AppService } from '../../application/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config/typeorm.config';
import { UserModule } from './user.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => dbConfig,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
