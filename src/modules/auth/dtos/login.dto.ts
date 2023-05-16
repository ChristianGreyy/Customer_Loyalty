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

export default class LoginDto {
  @IsOptional()
  @IsString()
  role: string;

  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'Invalid email',
  })
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, {
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

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsString()
  birthday: string;

  @IsEnum(Gender, { message: 'Invalid gender of user' })
  gender: string;

  @IsNumber()
  point: number;

  @IsString()
  otpCode: string;

  @IsBoolean()
  isCodeUsed: boolean;

  @IsString()
  refreshToekn: string;

  @IsString()
  rank: string;
}
