import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { StoresModule } from './modules/stores/stores.module';
import { MailerService } from './modules/mailer/mailer.service';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RewardsModule,
    StoresModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
