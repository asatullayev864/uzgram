
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false })
export class Admin {
    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: true })
    is_active: boolean;

    @Prop({ default: false })
    is_creator: boolean;

    @Prop({type: String, default: null})
    refresh_token: string | null;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
