import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TwilioModule } from '../twilio/twilio.module';
import { RewardsModule } from '../rewards/rewards.module';
import { StoresModule } from '../stores/stores.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),

    UsersModule,
    StoresModule,
    RewardsModule,
    TwilioModule,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
