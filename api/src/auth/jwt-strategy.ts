import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from './auth.service';
import { Admin } from 'src/admin/interfaces/admin.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'adminadmin'
    });
  }

  async validate(adminData: Admin): Promise<Admin> {
    const admin: Admin = await this.authService.validate(adminData);
    if(!admin) throw new UnauthorizedException();
    return admin;
  }
}