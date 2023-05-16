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
import { Rank } from 'src/common/enums/rank';

export default class CreateStoreDto {
  @IsOptional()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'Invalid email',
  })
  @MinLength(4)
  @MaxLength(50)
  email: string;

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
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  typePoint: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
