import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskStatusEnum } from './enum/task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async getAll(filters: FilterTasksDto): Promise<Task[]> {
    const { title, status } = filters;

    return this.tasksRepository.find({
      where: {
        status,
        title: title && Like(`%${title}`),
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async getById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async create(data: CreateTaskDto): Promise<Task> {
    const { title, description } = data;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
    });

    await this.tasksRepository.save(task);

    return task;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.tasksRepository.delete(id);

    if (!deleted.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateStatus(id: string, status: TaskStatusEnum): Promise<Task> {
    const task = await this.getById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
