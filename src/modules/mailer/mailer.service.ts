import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailerService {
  private transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  constructor() {
    this.transport
      .verify()
      .then(() => console.info('Connected to email server'))
      .catch(() =>
        console.warn(
          'Unable to connect to email server. Make sure you have configured the SMTP options in .env',
        ),
      );
  }
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

    await this.transport.sendMail(mailOptions);
  }
}
