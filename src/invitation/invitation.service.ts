import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './schema/invitation.schema';
import { Users } from '../users/schema/user.schema';
import { Event } from '../event/schema/event.schema';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Invitation.name) private readonly invitationModel: Model<Invitation>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) { }

  async create(createInvitationDto: CreateInvitationDto) {
    const { eventId, from_user, to_user } = createInvitationDto;

    if (!eventId || !from_user || !to_user) {
      throw new BadRequestException("Iltimos barcha ma'lumotlarni kiriting❗️");
    }

    const exestsEvent = await this.eventModel.findOne({ _id: eventId });
    if (!exestsEvent) {
      throw new NotFoundException("Bunday event topilmadi!");
    }

    const exestsFromUser = await this.userModel.findOne({ _id: from_user });
    const exestsToUser = await this.userModel.findOne({ _id: to_user });
    if (!exestsFromUser || !exestsToUser) {
      throw new NotFoundException("Bunday user topilmadi❌");
    }

    const newInvitation = await this.invitationModel.create({
      ...createInvitationDto,
      status: createInvitationDto.status ?? 'pending'
    });

    return newInvitation;
  }

  async findAll() {
    return await this.invitationModel
      .find()
      .populate('eventId', 'name')
      .populate('from_user', 'user_name email')
      .populate('to_user', 'user_name email');
  }

  async findOne(id: string) {
    const invitation = await this.invitationModel
      .findById(id)
      .populate('eventId', 'name')
      .populate('from_user', 'user_name email')
      .populate('to_user', 'user_name email');

    if (!invitation) {
      throw new NotFoundException('Taklif topilmadi❗️');
    }

    return invitation;
  }

  async update(id: string, updateInvitationDto: UpdateInvitationDto) {
    const updated = await this.invitationModel.findByIdAndUpdate(
      id,
      updateInvitationDto,
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException('Yangilanish uchun taklif topilmadi❗️');
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.invitationModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("O'chirish uchun taklif topilmadi❗️");
    }
    return { message: "Taklif muvaffaqiyatli o'chirildi✅" };
  }
}