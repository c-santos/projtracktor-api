import { Module } from '@nestjs/common';
import { AppController } from '../http/controllers/app.controller';
import { AppService } from '../../application/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config/typeorm.config';
import { UserModule } from './user.module';
import { ProjectModule } from './project.module';
import { TaskModule } from './task.module';
import { TagController } from '../http/controllers/tag.controller';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => dbConfig,
        }),
        UserModule,
        ProjectModule,
        TaskModule,
        TagController
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
