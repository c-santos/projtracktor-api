import { Module } from '@nestjs/common';
import { TagService } from '@/application/services/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '../http/controllers/tag.controller';
import { Tag } from '../database/models/tag.model';
import { TagRepository } from '../database/repositories/tag.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagRepository, TagService],
    controllers: [TagController],
    exports: [TagService],
})
export class TagModule {}
