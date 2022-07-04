import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
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
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;
    this.usersRepository.create(authCredentials);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.usersRepository.save({ username, password: hashedPassword });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async verifyUser(authCredentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentials;

    const user = await this.usersRepository.findOne({ where: { username } });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (user && isPasswordCorrect) {
      return 'success';
    } else {
      throw new UnauthorizedException(
        'Please, verify your sign in credentials.',
      );
    }
  }
}
