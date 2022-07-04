import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly tasksRepository: Repository<User>,
  ) {}

  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;
    const user = this.tasksRepository.create(authCredentials);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.tasksRepository.save({ username, password: hashedPassword });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
