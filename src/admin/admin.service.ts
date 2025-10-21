import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Admin } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminSchema: Model<Admin>,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    createAdminDto.password = hashedPassword;
    return this.adminSchema.create(createAdminDto);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminSchema.find().exec();
  }

  async findOne(id: string): Promise<Admin | null> {
    return this.adminSchema.findById(id).exec();
  }

  async findAdminByEmail(email: string) {
    return await this.adminSchema.findOne({ email }).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Bunday ID da Admin topilmadi❌");
    }
    return this.adminSchema.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Admin | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Bunday ID da Admin topilmadi❌");
    }
    return this.adminSchema.findByIdAndDelete(id).exec();
  }
}