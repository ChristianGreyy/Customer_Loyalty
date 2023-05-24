import { IsString } from 'class-validator';
import { Gender } from 'src/common/enums/gender';

export default class sendOtpEmailDto {
  @IsString()
  to: string;

  @IsString()
  otp: string;
}
