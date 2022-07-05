import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { VerificationInterface } from './interface/verification-return.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('signin')
  signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<VerificationInterface> {
    return this.authService.signIn(authCredentials);
  }
}
