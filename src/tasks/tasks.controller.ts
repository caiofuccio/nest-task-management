import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(@Query() filters: FilterTasksDto): Promise<Task[]> {
    return this.tasksService.getAllTasks(filters);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  create(@Body() data: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() data: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = data;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
