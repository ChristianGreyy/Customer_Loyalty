import { Module } from '@nestjs/common';
import { MailersService } from './mailer.service';
import { BullModule } from '@nestjs/bull';
import { MailersController } from './mailer.controller';
import { MailerConsumer } from './mailer.consumer';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'CL:mailer',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
  ],
  controllers: [MailersController],
  providers: [MailersService, MailerConsumer],
  exports: [MailersService],
})
export class MailersModule {}
