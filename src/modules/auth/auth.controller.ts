import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import LoginDto from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import RegisterUserDto from './dtos/register-user.dto';
import RegisterStoreDto from './dtos/register-store.dto';
import { TwilioService } from '../twilio/twilio.service';
import VerifyUserDto from './dtos/verify-user.dto';
import VerifyStoreDto from './dtos/verify-store.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/enums/role';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('/login-user')
  async loginUser(@Body() loginDto: LoginDto) {
    const token = await this.authService.loginUser(loginDto);
    return token;
  }

  @HasRoles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/register-user')
  async registerUser(@Body() registerDto: RegisterUserDto) {
    const newUser = await this.authService.registerUser(registerDto);
    return {
      message:
        'System send OTP to your phone, please check OTP to verify account',
      userId: newUser.id,
    };
  }

  @Post('/resend-otp-sms')
  async resendOTPRegisterUser(@Body('userId') userId) {
    const user = await this.authService.resendOTPRegisterUser(userId);
    return {
      message:
        'System resend OTP to your phone, please check OTP to verify account',
      userId: user.id,
    };
  }

  @Post('/verify-user')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    const message = await this.authService.verifyRegisterUser(verifyUserDto);
    return {
      message,
    };
  }

  @Post('/register-store')
  async registerStore(@Body() registerStoreDto: RegisterStoreDto) {
    const newStore = await this.authService.registerStore(registerStoreDto);
    return {
      message:
        // 'Create store successfully, please waiting for confirmation from admin',
        'System send OTP to your email, please check OTP to verify store',
      storeId: newStore.id,
    };
  }

  @Post('/resend-otp-mailer')
  async resendOTPRegisterStore(@Body('storeId') storeId) {
    const store = await this.authService.resendOTPRegisterStore(storeId);
    return {
      message:
        // 'Create store successfully, please waiting for confirmation from admin',
        'System resend OTP to your email, please check OTP to verify store',
      storeId: store.id,
    };
  }

  @Post('/verify-store')
  async verifyStore(@Body() verifyStoreDto: VerifyStoreDto) {
    const message = await this.authService.verifyRegisterStore(verifyStoreDto);
    return {
      message,
    };
  }
}
