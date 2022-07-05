import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { VerificationInterface } from './interface/verification-return.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentials);
  }

  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<VerificationInterface> {
    return this.usersRepository.verifyUser(authCredentials);
  }
}
