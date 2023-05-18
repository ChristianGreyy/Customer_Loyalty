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
import { UploadService } from './modules/upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './common/configs/multer.config';
import { TokenService } from './modules/token/token.service';
import { OrderDetailsService } from './modules/order_details/order_details.service';
import { BullModule } from '@nestjs/bull';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedisService } from './modules/redis/redis.service';
import { RedisModule } from './modules/redis/redis.module';

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
    MailerModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // MailerService,
    // UploadService,
    // TokenService,
    // OrderDetailsService,
    // RedisService,
  ],
})
export class AppModule {}
