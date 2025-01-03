import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1234azert', 
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Token invalide ou manquant');
    }
  
    return { userId: payload.sub, email: payload.email, name: payload.name, role: payload.role };
  }
  
}

