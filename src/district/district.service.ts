import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Region } from '../region/schema/region.schema';
import { District } from './schema/district.schema';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(Region.name) private readonly regionModel: Model<Region>,
    @InjectModel(District.name) private readonly districtModel: Model<District>,
  ) { }

  async create(createDistrictDto: CreateDistrictDto) {
    const region = await this.regionModel.findById(createDistrictDto.regionId);
    if (!region) {
      throw new NotFoundException('Bunday viloyat topilmadi❌');
    }

    const newDistrict = await this.districtModel.create({
      name: createDistrictDto.name,
      regionId: createDistrictDto.regionId,
    });

    if (Array.isArray(region.districts)) {
      region.districts.push(newDistrict._id as unknown as Types.ObjectId);
    } else {
      region.districts = [newDistrict._id as unknown as Types.ObjectId];
    }

    await region.save();

    return newDistrict;
  }

  async findAll() {
    return this.districtModel.find().populate('regionId', 'name');
  }

  async findOne(id: string) {
    const district = await this.districtModel.findById(id).populate('regionId', 'name');
    if (!district) throw new NotFoundException('District topilmadi❌');
    return district;
  }

  async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    const updated = await this.districtModel.findByIdAndUpdate(id, updateDistrictDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('District topilmadi❌');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.districtModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('District topilmadi❌');
    return { message: "District muvaffaqiyatli o'chirildi✅" };
  }
}