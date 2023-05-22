import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TwilioModule } from '../twilio/twilio.module';
import { RewardsModule } from '../rewards/rewards.module';
import { StoresModule } from '../stores/stores.module';
import { MailerModule } from '../mailer/mailer.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';
import { RolesGuard } from './roles.guard';
import { AdminsModule } from '../admin/admins.module';

@Module({
  imports: [
    PassportModule,
    MailerModule,
    TwilioModule,
    UsersModule,
    AdminsModule,
    StoresModule,
    RewardsModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
