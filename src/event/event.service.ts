import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const { name } = createEventDto;

    if (!name) {
      throw new BadRequestException("Iltimos barcha ma'lumotlarni kiriting❗️");
    }

    const existingEvent = await this.eventModel.findOne({ name });
    if (existingEvent) {
      throw new BadRequestException("Bunday nomli event allaqachon mavjud❗️");
    }

    const newEvent = await this.eventModel.create(createEventDto);
    return newEvent;
  }

  async findAll() {
    return await this.eventModel.find();
  }

  async findOne(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException("Event topilmadi❗️");
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const updated = await this.eventModel.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException("Yangilanish uchun event topilmadi❗️");
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.eventModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("O'chirish uchun event topilmadi❗️");
    }
    return { message: "Event muvaffaqiyatli o'chirildi✅" };
  }
}