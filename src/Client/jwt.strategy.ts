import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './Auth/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
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
