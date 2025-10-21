import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Relation } from './schema/relation.schema';
import { Model, Types } from 'mongoose';
import { Users } from '../users/schema/user.schema';

@Injectable()
export class RelationService {
  constructor(
    @InjectModel(Relation.name) private readonly relationModel: Model<Relation>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) { }

  async create(createRelationDto: CreateRelationDto) {
    if (!createRelationDto.user1 || !createRelationDto.user2 || !createRelationDto.name) {
      throw new BadRequestException("Iltimos malumotlarni toliq kiriting‼️");
    }

    const user1 = await this.userModel.findOne({ _id: createRelationDto.user1 });
    const user2 = await this.userModel.findOne({ _id: createRelationDto.user2 });
    if (!user1 || !user2) {
      throw new NotFoundException("Bunday user topilmadi❌");
    }

    const newRelation = await this.relationModel.create(createRelationDto);
    return newRelation;
  }

  findAll() {
    return this.relationModel.find()
      .populate('user1', 'name bio email')
      .populate('user2', 'name bio email')
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid relation id');
    }

    const relation = await this.relationModel
      .findById(id)
      .populate('user1', 'name bio email')
      .populate('user2', 'name bio email')

    if (!relation) {
      throw new NotFoundException('Relation not found');
    }

    return relation;
  }

  async update(id: string, updateRelationDto: UpdateRelationDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid relation id');
    }

    if (updateRelationDto.user1) {
      const user1 = await this.userModel.findOne({ _id: updateRelationDto.user1 });
      if (!user1) {
        throw new NotFoundException("Bunday user topilmadi❌");
      }
    }

    if (updateRelationDto.user2) {
      const user2 = await this.userModel.findOne({ _id: updateRelationDto.user2 });
      if (!user2) {
        throw new NotFoundException("Bunday user topilmadi❌");
      }
    }
    const updated = await this.relationModel.findByIdAndUpdate(id, updateRelationDto, {
      new: true
    });
    if (!updated) throw new NotFoundException('Relation not found');
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid relation id');
    }
    return await this.relationModel.findByIdAndDelete(id);
  }
}
