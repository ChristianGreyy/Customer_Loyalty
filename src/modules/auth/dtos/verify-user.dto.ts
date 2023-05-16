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

export default class VerifyUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  code: string;
}
