import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ versionKey: false })
export class Event {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);