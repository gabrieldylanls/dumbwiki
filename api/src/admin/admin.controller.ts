import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { AdminService } from './admin.service';
import { Admin } from './interfaces/admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) { }

  @Get()
  async findAll(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: { id: string }): Promise<Admin> {
    return await this.adminService.findById(params.id);
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  @Put(':id')
  async update(@Param() params: { id: string }, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return await this.adminService.update(params.id, updateAdminDto);
  }

  @Put('/updatePassword/:id')
  async updatePassword(@Param() params: { id: string }, @Body() password: string): Promise<Admin> {
    return await this.adminService.updatePassword(params.id, password);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: { id: string }): Promise<boolean> {
    return await this.adminService.delete(params.id);
  }
}