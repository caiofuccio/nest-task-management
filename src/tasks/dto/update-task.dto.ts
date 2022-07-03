import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../enum/task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
