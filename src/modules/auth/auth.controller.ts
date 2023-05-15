import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';
import RegisterDto from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const access_token = await this.authService.login(loginDto);
    return {
      access_token: access_token,
    };
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const message = await this.authService.register(registerDto);
    return {
      message,
    };
  }
}
