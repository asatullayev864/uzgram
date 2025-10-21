import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password, user_name, name, phone_number, gender, age } = createUserDto;

    if (!email || !password || !user_name || !name || !phone_number || !gender || !age) {
      throw new NotFoundException("Iltimos, ma'lumotlarni to'liq kiriting‼️");
    }

    const existEmail = await this.userModel.findOne({ email });
    if (existEmail) {
      throw new BadRequestException("Bunday email allaqachon mavjud❗️");
    }

    const existUsername = await this.userModel.findOne({ user_name });
    if (existUsername) {
      throw new BadRequestException("Bunday username allaqachon mavjud❗️");
    }

    createUserDto.password = await bcrypt.hash(password, 7);

    const newUser = await this.userModel.create({
      ...createUserDto
    });

    return newUser;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const existUser = await this.userModel.findById(id).exec();
    if (!existUser) {
      throw new NotFoundException("Bunday user topilmadi❌");
    }
    return existUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, user_name } = updateUserDto;

    const existUser = await this.userModel.findById({ id });
    if (!existUser) {
      throw new NotFoundException("Bunday user topilmadi❌");
    }

    const existEmail = await this.userModel.findOne({ email });
    if (existEmail) {
      throw new BadRequestException("Bunday email allaqachon mavjud❗️");
    }

    const existUsername = await this.userModel.findOne({ user_name });
    if (existUsername) {
      throw new BadRequestException("Bunday username allaqachon mavjud❗️");
    }

    return this.userModel.findByIdAndUpdate(
      id, updateUserDto, { new: true }
    ).exec();
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Bunday user topilmadi❌");
    }
    return this.userModel.findByIdAndDelete(id).exec();
  }
}