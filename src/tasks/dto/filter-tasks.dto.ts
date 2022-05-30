import { TaskStatus } from '../task.interface';

export class FilterTasksDto {
  status?: TaskStatus;
  search?: string;
}
