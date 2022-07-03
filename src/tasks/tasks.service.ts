import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskStatusEnum } from './enum/task-status.enum';
import { Task } from './task.interface';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getAllTasks(filters: FilterTasksDto): Promise<Task[]> {
    return this.tasksRepository.getAll(filters);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getById(id);
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create(data);
  }

  async deleteTask(id: string): Promise<void> {
    return this.tasksRepository.delete(id);
  }

  async updateTaskStatus(id: string, status: TaskStatusEnum): Promise<Task> {
    return this.tasksRepository.updateStatus(id, status);
  }
}
