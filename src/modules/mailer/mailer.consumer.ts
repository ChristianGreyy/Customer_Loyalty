import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('CL:mailer')
export class MailerConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process('send-otp')
  async transcode(job: Job<any>) {
    return await this.mailerService.sendMail(job.data);
  }
}
