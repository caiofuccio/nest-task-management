import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  create(data: CreateTaskDto): Task {
    const { title, description } = data;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateStatus(id: string, status: TaskStatus): Task {
    this.tasks.filter((task) =>
      task.id === id ? (task.status = status) : status,
    );

    return this.getById(id);
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  filterTasks(filters: FilterTasksDto): Task[] {
    const { status, search } = filters;

    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) =>
        Object.keys(task)
          .map((key) => task[key] === search)
          .some((element) => element === true),
      );

      console.log(tasks);
    }

    return tasks;
  }
}
