import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth.constant';

//pulls user from token
@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // for local testing
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
