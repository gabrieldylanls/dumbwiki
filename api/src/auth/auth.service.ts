import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) { }

  async login(adminData: Admin): Promise<{ status: HttpStatus, token: string }> {
    const admin = await this.validate(adminData);
    if(!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

    const validatePassword = await compare(adminData.password, admin.password);
    if(!validatePassword) throw new HttpException('Invalid email or password', HttpStatus.FORBIDDEN);
    
    const payload: JwtPayload = { id: admin.id, userName: admin.userName, email: admin.email };
    const token = this.jwtService.sign(payload, { expiresIn: 84600 });

    return {
      status: HttpStatus.OK,
      token      
    };
  }

  async register(createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  async validate(adminData: Admin): Promise<Admin> {
    const { email } = adminData;
    return await this.adminService.findByEmail(email);
  }
}