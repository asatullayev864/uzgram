import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventGuestDto } from './dto/create-event_guest.dto';
import { UpdateEventGuestDto } from './dto/update-event_guest.dto';
import { EventGuest } from './schema/event_guest.schema';

@Injectable()
export class EventGuestsService {
  constructor(
    @InjectModel(EventGuest.name)
    private readonly eventGuestModel: Model<EventGuest>,
  ) { }

  async create(createEventGuestDto: CreateEventGuestDto) {
    const { eventId, userId } = createEventGuestDto;

    if (!eventId || !userId) {
      throw new BadRequestException("Iltimos barcha ma'lumotlarni kiriting❗️");
    }

    const existing = await this.eventGuestModel.findOne({ eventId, userId });
    if (existing) {
      throw new BadRequestException('Bu foydalanuvchi allaqachon ushbu eventda qatnashmoqda❗️');
    }

    const newGuest = await this.eventGuestModel.create({
      eventId: new Types.ObjectId(eventId),
      userId: new Types.ObjectId(userId),
    });

    return newGuest;
  }

  async findAll() {
    return await this.eventGuestModel
      .find()
      .populate('eventId', 'name')
      .populate('userId', 'username email');
  }

  async findOne(id: string) {
    const guest = await this.eventGuestModel
      .findById(id)
      .populate('eventId', 'name')
      .populate('userId', 'username email');

    if (!guest) {
      throw new NotFoundException('Event guest topilmadi❗️');
    }

    return guest;
  }

  async update(id: string, updateEventGuestDto: UpdateEventGuestDto) {
    const updated = await this.eventGuestModel.findByIdAndUpdate(
      id,
      updateEventGuestDto,
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException('Yangilanish uchun event guest topilmadi❗️');
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.eventGuestModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("O'chirish uchun event guest topilmadi❗️");
    }
    return { message: "Event guest muvaffaqiyatli o'chirildi✅" };
  }
}