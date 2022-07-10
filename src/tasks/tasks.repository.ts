import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
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

  async getAll(filters: FilterTasksDto, user: User): Promise<Task[]> {
    const { search, status } = filters;

    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async getById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async create(data: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = data;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
      userId: user.id,
    });

    await this.tasksRepository.save(task);

    return task;
  }

  async delete(id: string, user: User): Promise<void> {
    const deleted = await this.tasksRepository.delete({ id, user });

    if (!deleted.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateStatus(
    id: string,
    status: TaskStatusEnum,
    user: User,
  ): Promise<Task> {
    const task = await this.getById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
