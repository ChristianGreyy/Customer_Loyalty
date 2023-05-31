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
import { Gender } from '../../../common/enums/gender';
import { Rank } from '../../../common/enums/rank';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
    message: 'Invalid phone number',
  })
  @MinLength(4)
  @MaxLength(20)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsString()
  birthday: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender of user' })
  gender: string;

  @IsOptional()
  @IsNumber()
  point: number;

  @IsOptional()
  @IsNumber()
  hoardingPoints: number;

  @IsOptional()
  @IsString()
  otpCode: string;

  @IsOptional()
  @IsBoolean()
  isCodeUsed: boolean;

  @IsOptional()
  @IsEnum(Rank, { message: 'Invalid rank' })
  rank: string;
}
