import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChenelDto } from './dto/create-chenel.dto';
import { UpdateChenelDto } from './dto/update-chenel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chenel } from './schema/chenel.schema';
import { Model, Types } from 'mongoose';
import { Users } from '../users/schema/user.schema';


@Injectable()
export class ChenelService {
  constructor(
    @InjectModel(Chenel.name) private readonly chenelSchema: Model<Chenel>,
    @InjectModel(Users.name) private readonly userSchema: Model<Users>,
  ) { }


  async create(createChenelDto: CreateChenelDto) {
    const user_id = createChenelDto.user_id;
    const user = await this.userSchema.findById(user_id);
    if (!user) {
      throw new NotFoundException('Bunday user_id topilmadi');
    }

    const chenel = await this.chenelSchema.create(createChenelDto);

    user.chenel_Id.push(chenel._id);

    await user.save();

    return chenel;
  }


  findAll() {
    return this.chenelSchema.find().populate("user_id")
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Chenel ID noto'g'ri formatda")
    }

    const chenel = await this.chenelSchema.findById(id).populate("user_id")
    if (!chenel) {
      throw new NotFoundException("Bunday ID topilmadi")
    }
    return chenel
  }

  async update(id: string, updateChenelDto: UpdateChenelDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Chenel ID noto'g'ri formatda");
    }

    // Kanalni topamiz va user ma'lumotlarini populate qilamiz
    const chenel = await this.chenelSchema.findById(id).populate("user_id");
    if (!chenel) {
      throw new NotFoundException("Bunday ID topilmadi");
    }

    const { user_id, name, status, description } = updateChenelDto;

    // Agar user_id o'zgargan bo'lsa, yangi foydalanuvchi borligini tekshiramiz
    if (user_id && user_id !== chenel.user_id.toString()) {
      if (!Types.ObjectId.isValid(user_id)) {
        throw new BadRequestException("User ID noto'g'ri formatda");
      }

      const newUser = await this.userSchema.findById(user_id);
      if (!newUser) {
        throw new NotFoundException("Bunday user_id topilmadi");
      }

      chenel.user_id = newUser; 
    }

    // Qolgan propertylarni yangilaymiz, agar berilgan bo‘lsa
    if (name) chenel.name = name;
    if (status) chenel.status = status;
    if (description) chenel.description = description;

    // O‘zgarishlarni saqlaymiz
    await chenel.save();

    return chenel;
  }


  async remove(id: string) {
    if(!Types.ObjectId.isValid(id)){
      throw new BadRequestException("Chenel ID noto'g'ri formatda")
    }

    const chenel = await this.chenelSchema.findByIdAndDelete(id);
    if(!chenel){
      throw new NotFoundException("Bunday chenel topilmadi")
    }

    const user = await this.userSchema.findById(chenel.user_id)
    if(user){
      user.chenel_Id = user.chenel_Id.filter(cId => cId.toString() !== chenel.toString())
      await user.save()
    }
    return { message: "Chenel muvaffaqiyatli o'chirildi"}
  }
}
