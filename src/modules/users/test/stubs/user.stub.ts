import { Gender } from '../../../../common/enums/gender';
import { Rank } from '../../../../common/enums/rank';

export const userStub = {
  id: 3,
  phoneNumber: '0842338167',
  password: 'HungTruong@',
  firstName: 'Hung',
  lastName: 'Truong',
  gender: Gender.male,
  birthday: '2002-05-23',
  point: 0,
  hoardingPoints: 0,
  isCodeUsed: true,
  rank: Rank.bronze,
};

export const foundUserStub = {
  id: 1,
  phoneNumber: '0842338169',
  firstName: 'Hung',
  lastName: 'Truong',
  gender: Gender.male,
  birthday: '2002-05-23',
  point: 0,
  hoardingPoints: 0,
  isCodeUsed: true,
  rank: Rank.bronze,
};
