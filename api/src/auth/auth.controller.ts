import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() admin: Admin): Promise<{ status: HttpStatus, token: string }> {
    return await this.authService.login(admin);
  }

  @Post('register')
  async register(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.authService.register(createAdminDto);
  }
}