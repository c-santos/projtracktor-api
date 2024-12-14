import { Controller, Get } from '@nestjs/common';
import { TagService } from '@/application/services/tag.service';
import { Inject } from '@nestjs/common';

@Controller('tags')
export class TagController {
    constructor(@Inject(TagService) private tagService: TagService) {}

    @Get('tasks')
    async getAllTaskTags() {
        return await this.tagService.getAllTaskTags();
    }

    @Get('projects')
    async getAllProjectTags() {
        return await this.tagService.getAllProjectTags();
    }
}
