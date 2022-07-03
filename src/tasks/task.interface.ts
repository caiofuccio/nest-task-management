import { TaskStatusEnum } from './enum/task-status.enum';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
