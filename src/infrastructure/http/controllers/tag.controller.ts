import { Controller, Get } from '@nestjs/common';
import { TagService } from '@/application/services/tag.service';
import { Inject } from '@nestjs/common';

@Controller('tags')
export class TagController {
    constructor(@Inject(TagService) private tagService: TagService) {}

    @Get('')
    async getAllTaskTags() {
        return await this.tagService.getAllTags();
    }
}
