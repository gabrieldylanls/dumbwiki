import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';

import { Admin } from './interfaces/admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>
  ) { }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find();
  }

  async findById(id: string): Promise<Admin> {
    return await this.adminModel.findById(id);
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const password = await hash(createAdminDto.password, 10);
    return await this.adminModel.create({ ...createAdminDto, password });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return await this.adminModel.findByIdAndUpdate(id, updateAdminDto);
  }

  async updatePassword(id: string, password: string): Promise<Admin> {
    password = await hash(password, 10);
    return await this.adminModel.findByIdAndUpdate(id, { password });
  }

  async delete(id: string): Promise<boolean> {
    return await this.adminModel.findByIdAndDelete(id).then(res => !!res);
  }
}