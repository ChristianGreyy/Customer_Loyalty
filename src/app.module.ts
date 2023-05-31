import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { StoresModule } from './modules/stores/stores.module';
import { MailersModule } from './modules/mailer/mailer.module';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from './modules/redis/redis.module';
import { AdminsModule } from './modules/admin/admins.module';
import { RanksModule } from './modules/ranks/ranks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RewardsModule,
    StoresModule,
    RanksModule,
    AdminsModule,
    MailersModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
