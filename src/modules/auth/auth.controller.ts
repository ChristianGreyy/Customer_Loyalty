import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterUserDto from './dtos/register-user.dto';
import RegisterStoreDto from './dtos/register-store.dto';
import VerifyUserDto from './dtos/verify-user.dto';
import VerifyStoreDto from './dtos/verify-store.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/enums/role';
import { RolesGuard } from './roles.guard';
import LoginAdminDto from './dtos/login-admin.dto';
import LoginStoreDto from './dtos/login-store.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login-user')
  async loginUser(@Request() req) {
    const token = await this.authService.loginUser(req.user);
    return token;
  }

  @Post('/login-admin')
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    const token = await this.authService.loginAdmin(loginAdminDto);
    return token;
  }

  @Post('/login-store')
  async loginStore(@Body() loginStoreDto: LoginStoreDto) {
    const token = await this.authService.loginStore(loginStoreDto);
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

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/verify-store-active/:storeId')
  async verifyStoreActive(@Param('storeId') storeId: number) {
    const message = await this.authService.verifyStoreActive(storeId);
    return {
      message,
    };
  }

  @Post('/reset-access/:userId')
  async resetAccessToken(@Param('userId', ParseIntPipe) userId: number) {
    const accessToken = await this.authService.resetAccessToken(userId);
    return {
      accessToken,
    };
  }
}
