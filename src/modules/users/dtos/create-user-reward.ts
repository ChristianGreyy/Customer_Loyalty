import { IsNumber } from 'class-validator';

export default class CreateUserRewardDto {
  @IsNumber()
  quantity: number;
}
