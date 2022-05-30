import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
