import { TaskPriority } from '@/domain/enums/task-priority.enum';
import {
    IsBoolean,
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateTaskDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    completed: boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsEnum(TaskPriority, { each: true })
    priority: TaskPriority;
}
