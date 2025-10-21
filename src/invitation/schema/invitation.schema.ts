import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Event } from '../../event/schema/event.schema';
import { Users } from '../../users/schema/user.schema';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema({ versionKey: false, timestamps: true })
export class Invitation {
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
    from_user: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    })
    to_user: Types.ObjectId;

    @Prop({
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    })
    status: string;

    @Prop()
    message: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
