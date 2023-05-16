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

export default class VerifyStoreDto {
  @IsNumber()
  storeId: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  code: string;
}
