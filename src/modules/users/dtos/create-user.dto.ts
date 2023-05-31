import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../common/enums/gender';

export default class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
    message: 'Invalid phone number',
  })
  @MinLength(4)
  @MaxLength(20)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsString()
  birthday: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender, { message: 'Invalid gender of user' })
  gender: Gender;
}
