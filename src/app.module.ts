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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register(multerConfig),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RewardsModule,
    StoresModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService, UploadService],
})
export class AppModule {}
