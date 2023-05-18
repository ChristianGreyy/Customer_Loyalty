import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender';

export default class LoginUserDto {
  @IsString()
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
    message: 'Invalid phone number',
  })
  @MinLength(4)
  @MaxLength(20)
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
