import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from './schema/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) { }

  async create(createGroupDto: CreateGroupDto) {
    const newGroup = await this.groupModel.create(createGroupDto);
    return newGroup;
  }

  async findAll() {
    return this.groupModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid group id');
    }

    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid group id');
    }

    const updatedGroup = await this.groupModel.findByIdAndUpdate(
      id,
      updateGroupDto,
      { new: true },
    );

    if (!updatedGroup) {
      throw new NotFoundException('Group not found');
    }

    return updatedGroup;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid group id');
    }

    const deletedGroup = await this.groupModel.findByIdAndDelete(id);

    if (!deletedGroup) {
      throw new NotFoundException('Group not found');
    }

    return { message: 'Group deleted successfully ✅' };
  }
}