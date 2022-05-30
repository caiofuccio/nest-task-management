import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
