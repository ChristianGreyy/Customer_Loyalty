import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailersService {
  constructor(@InjectQueue('CL:mailer') private mailerQueue: Queue) {}

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const filePath = path.join(
      __dirname,
      '../../../src/common/views/otp-email.html',
    );
    const template = handlebars.compile(fs.readFileSync(filePath, 'utf8'));
    const html = template({ otp });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: 'One Time Password (OTP)',
      html,
    };

    this.mailerQueue.add('send-otp', mailOptions);
  }
}
