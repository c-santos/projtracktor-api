import { TaskPriority } from '@/domain/enums/task-priority.enum';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority;
}
