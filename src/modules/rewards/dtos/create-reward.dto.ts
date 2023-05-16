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

export default class CreateRewardDto {
  @IsNumber()
  storeId: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsNumber()
  point: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  image: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  startTime: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  endTime: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  description: string;
}
