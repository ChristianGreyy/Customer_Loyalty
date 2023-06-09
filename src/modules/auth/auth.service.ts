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
import { MailersService } from '../mailer/mailer.service';
import VerifyStoreDto from './dtos/verify-store.dto';
import LoginUserDto from './dtos/login-user.dto';
import { TokenService } from '../token/token.service';
import LoginAdminDto from './dtos/login-admin.dto';
import { Admin } from '../admin/admin.entity';
import LoginStoreDto from './dtos/login-store.dto';
import { RanksService } from '../ranks/ranks.service';
import { StoreRank } from '../store_ranks/store_ranks.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly usersService: UsersService,
    @Inject('StoresRepository')
    private readonly storesRepository: typeof Store,
    @Inject('AdminsRepository')
    private readonly adminsRepository: typeof Admin,
    @Inject('StoreRanksRepository')
    private readonly storeRanksRepository: typeof StoreRank,
    private readonly rankService: RanksService,
    private readonly mailerService: MailersService,
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

  async loginUser(user: any): Promise<any> {
    const payload = { phoneNumber: user.phoneNumber, sub: user.id };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);
    user.refreshToken = refreshToken;
    await user.save();
    return {
      accessToken,
      refreshToken,
    };
    // return await this.jwtService.signAsync(payload);
  }

  async loginAdmin(loginAdminDto: LoginAdminDto): Promise<any> {
    const admin = await this.adminsRepository.findOne({
      where: {
        username: loginAdminDto.username,
        password: loginAdminDto.password,
      },
    });
    if (!admin) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    const payload = { username: admin.username, sub: admin.id };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);
    admin.refreshToken = refreshToken;
    await admin.save();

    return {
      accessToken,
      refreshToken,
    };
  }

  async loginStore(loginStoreDto: LoginStoreDto): Promise<any> {
    const store = await this.storesRepository.findOne({
      where: {
        email: loginStoreDto.email,
        password: loginStoreDto.password,
      },
    });
    if (!store) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    const payload = { email: store.email, sub: store.id };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);
    store.refreshToken = refreshToken;
    await store.save();

    return {
      accessToken,
      refreshToken,
    };
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
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
    this.twiioService.sendSms('+84359741482', `Your OTP code: ${otpCode}`);

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

  async verifyStoreActive(storeId: number): Promise<string> {
    // Check store exists ?
    const store: any = await this.storesRepository.findOne({
      where: {
        id: storeId,
        isActive: false,
      },
    });

    if (!store) {
      throw new BadRequestException('Store not found');
    }
    store.isActive = true;
    await store.save();

    const ranks = await this.rankService.getRanks();
    const storeRanks = ranks.map((rank) => {
      return {
        rankId: rank.id,
        storeId: store.id,
        discount: 0,
        point: 0,
        maxPoint: 0,
      };
    });

    await this.storeRanksRepository.bulkCreate(storeRanks);

    return 'Verify store successfully';
  }

  async resetAccessToken(userId: number) {
    const user = await this.usersService.getUserById(userId);
    return await this.tokenService.resetAccessToken(user.refreshToken);
  }
}
