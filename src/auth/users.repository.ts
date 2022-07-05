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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { VerificationInterface } from './interface/verification-return.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
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

  async verifyUser(
    authCredentials: AuthCredentialsDto,
  ): Promise<VerificationInterface> {
    const { username, password } = authCredentials;

    const user = await this.usersRepository.findOne({ where: { username } });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (user && isPasswordCorrect) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Please, verify your sign in credentials.',
      );
    }
  }
}
