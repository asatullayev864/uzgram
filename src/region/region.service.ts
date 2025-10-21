import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionModel: Model<Region>,
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionModel.create(createRegionDto);
    return newRegion;
  }

  async findAll() {
    return this.regionModel.find().populate('districts', 'name -_id');
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid region id');
    }

    const region = await this.regionModel
      .findById(id)
      .populate('districts', 'name');

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const updated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Region not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.regionModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Region not found');
    return { message: 'Region deleted successfully' };
  }
}