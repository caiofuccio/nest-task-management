import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskStatusEnum } from './enum/task-status.enum';
import { Task } from './task.interface';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getAllTasks(filters: FilterTasksDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getAll(filters, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getById(id, user);
  }

  async createTask(data: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.create(data, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.delete(id, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatusEnum,
    user: User,
  ): Promise<Task> {
    return this.tasksRepository.updateStatus(id, status, user);
  }
}
