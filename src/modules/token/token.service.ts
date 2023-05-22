import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(payload: any): Promise<string> {
    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      'minutes',
    );
    payload['exp'] = accessTokenExpires.unix();
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async generateRefreshToken(payload: any): Promise<string> {
    const refreshTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      'days',
    );
    payload['exp'] = refreshTokenExpires.unix();
    const refreshToken = this.jwtService.sign(payload);
    return refreshToken;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      return null;
    }
  }

  async resetAccessToken(refreshToken: string): Promise<string> {
    const payload = await this.verifyToken(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      'minutes',
    );
    payload['exp'] = accessTokenExpires.unix();
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
