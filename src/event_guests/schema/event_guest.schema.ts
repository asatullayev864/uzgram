import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Event } from '../../event/schema/event.schema';
import { Users } from '../../users/schema/user.schema';

export type EventGuestDocument = HydratedDocument<EventGuest>;

@Schema({ versionKey: false })
export class EventGuest {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    })
    eventId: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    })
    userId: Types.ObjectId;
}

export const EventGuestSchema = SchemaFactory.createForClass(EventGuest);
