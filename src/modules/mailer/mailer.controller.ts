import { Body, Controller, Post } from '@nestjs/common';
import { MailersService } from './mailer.service';
import sendOtpEmailDto from './dtos/sendOtpEmail.dto';

@Controller('mailer')
export class MailersController {
  constructor(private mailersService: MailersService) {}

  @Post('/send-message')
  async sendMessage(@Body() sendOtpEmailDto: sendOtpEmailDto) {
    await this.mailersService.sendOtpEmail(
      sendOtpEmailDto.to,
      sendOtpEmailDto.otp,
    );
    return {
      message: 'send mail successfully',
    };
  }

  @Post('/send-otp')
  async sendOtpEmail(@Body() sendOtpEmailDto: sendOtpEmailDto) {
    await this.mailersService.sendOtpEmail(
      sendOtpEmailDto.to,
      sendOtpEmailDto.otp,
    );
    return {
      message: 'send mail successfully',
    };
  }
}
