import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';
import RegisterUserDto from './dtos/register-user.dto';
import RegisterStoreDto from './dtos/register-store.dto';
import { TwilioService } from '../twilio/twilio.service';
import VerifyUserDto from './dtos/verify-user.dto';
import VerifyStoreDto from './dtos/verify-store.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    twilService: TwilioService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const access_token = await this.authService.login(loginDto);
    return {
      access_token: access_token,
    };
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
