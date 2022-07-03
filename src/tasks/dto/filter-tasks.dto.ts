import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enum/task-status.enum';

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  title?: string;
}
