import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AdminService } from 'src/admin/admin.service';
import { AdminModule } from 'src/admin/admin.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'adminadmin',
      signOptions: {
        expiresIn: 84600
      }
    }),
    AdminModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminService],
  exports: [PassportModule]
})
export class AuthModule {}