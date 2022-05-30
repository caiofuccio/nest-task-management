import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { Task, TaskStatus } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('all')
  getAll(): Task[] {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  create(@Body() data: CreateTaskDto): Task {
    return this.tasksService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.tasksService.delete(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }

  @Get()
  filterTasks(@Query() filters: FilterTasksDto): Task[] {
    return this.tasksService.filterTasks(filters);
  }
}
