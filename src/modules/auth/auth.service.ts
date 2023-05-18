import {
  BadRequestException,
  Inject,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as twilio from 'twilio';
import { User } from '../users/user.entity';
import LoginDto from './dtos/login-user.dto';
import RegisterUserDto from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import RegisterStoreDto from './dtos/register-store.dto';
import { TwilioService } from '../twilio/twilio.service';
import { Op } from 'sequelize';
import VerifyUserDto from './dtos/verify-user.dto';
import { StoresService } from '../stores/stores.service';
import { Store } from '../stores/store.entity';
import * as moment from 'moment';
import { MailerService } from '../mailer/mailer.service';
import VerifyStoreDto from './dtos/verify-store.dto';
import LoginUserDto from './dtos/login-user.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly usersService: UsersService,
    @Inject('StoresRepository')
    private readonly storesRepository: typeof Store,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly twiioService: TwilioService,
    private readonly storesService: StoresService,
    private readonly tokenService: TokenService,
  ) {}

  async getRandomInt(min: number, max: number): Promise<number> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    const user: any = await this.usersRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!user || user.isCodeUsed === false) {
      return null;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return null;
    }
    return user;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.validateUser(
      loginUserDto.phoneNumber,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Phone number or password is incorrect');
    }
    const payload = { phoneNumber: user.phoneNumber, sub: user.id };
    return {
      accessToken: await this.tokenService.generateAccessToken(payload),
      refreshToken: await this.tokenService.generateRefreshToken(payload),
    };
    // return await this.jwtService.signAsync(payload);
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    // Check user exists ?
    const user: any = await this.usersRepository.findOne({
      where: { phoneNumber: registerUserDto.phoneNumber },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const otpCode = await this.getRandomInt(1000, 9999);
    registerUserDto['otpCode'] = otpCode;
    // this.twiioService.sendSms('+840359741482', `Your OTP code: ${otpCode}`);

    const codeExpireTime = moment().add(2, 'minutes');
    registerUserDto['codeExpireTime'] = codeExpireTime;

    return await this.usersService.createUser(registerUserDto);
  }

  async resendOTPRegisterUser(userId: number): Promise<User> {
    // Check user exists ?
    const user: any = await this.usersRepository.findOne({
      where: {
        id: userId,
        isCodeUsed: false,
        codeExpireTime: {
          [Op.lt]: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException("Don't spam resend OTP code");
    }
    // generate OTP Code
    const otpCode = await this.getRandomInt(1000, 9999);
    user['otpCode'] = otpCode.toString();
    // set expire time to  OTP Code
    const codeExpireTime = moment().add(2, 'minutes');
    user['codeExpireTime'] = codeExpireTime;
    // send sms
    // this.twiioService.sendSms('+840359741482', `Your OTP code: ${otpCode}`);

    return await user.save();
  }

  async verifyRegisterUser(verifyUserDto: VerifyUserDto): Promise<string> {
    // Check user exists ?
    const user: any = await this.usersRepository.findOne({
      where: {
        id: verifyUserDto.userId,
        isCodeUsed: false,
        otpCode: verifyUserDto.code,
        codeExpireTime: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('OTP code is invalid or expired');
    }
    user.isCodeUsed = true;
    await user.save();
    return 'Register successfully';
  }

  async registerStore(registerStore: RegisterStoreDto): Promise<Store> {
    // Check user exists ?
    const store: any = await this.storesRepository.findOne({
      where: { email: registerStore.email },
    });
    if (store) {
      throw new BadRequestException('Email already exists');
    }
    // generate OTP Code
    const otpCode = await this.getRandomInt(1000, 9999);
    registerStore['otpCode'] = otpCode.toString();
    // set expire time to  OTP Code
    const codeExpireTime = moment().add(2, 'minutes');
    registerStore['codeExpireTime'] = codeExpireTime;
    // send mailer
    this.mailerService.sendOtpEmail(registerStore.email, otpCode.toString());

    return await this.storesService.createStore(registerStore);
  }

  async resendOTPRegisterStore(storeId: number): Promise<Store> {
    // Check store exists ?
    const store: any = await this.storesRepository.findOne({
      where: {
        id: storeId,
        isCodeUsed: false,
        codeExpireTime: {
          [Op.lt]: new Date(),
        },
      },
    });

    if (!store) {
      throw new BadRequestException("Don't spam resend OTP code");
    }
    // generate OTP Code
    const otpCode = await this.getRandomInt(1000, 9999);
    store['otpCode'] = otpCode.toString();
    // set expire time to  OTP Code
    const codeExpireTime = moment().add(2, 'minutes');
    store['codeExpireTime'] = codeExpireTime;
    // Send mail
    this.mailerService.sendOtpEmail(store.email, otpCode.toString());

    return await store.save();
  }

  async verifyRegisterStore(verifyStoreDto: VerifyStoreDto): Promise<string> {
    // Check store exists ?
    const store: any = await this.storesRepository.findOne({
      where: {
        id: verifyStoreDto.storeId,
        isCodeUsed: false,
        otpCode: verifyStoreDto.code,
        codeExpireTime: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!store) {
      throw new BadRequestException('OTP code is invalid or expired');
    }
    store.isCodeUsed = true;
    await store.save();
    return 'Verify email successfully, please waiting for confirmation from admin';
  }
}
