import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GenderEnum } from '../../common/enums/gender-enum';


export type UserDocument = HydratedDocument<Users>;

@Schema({ versionKey: false })
export class Users {
    @Prop()
    name: string;

    @Prop()
    user_name: string;

    @Prop()
    phone_number: string;

    @Prop({
        enum: GenderEnum,
        required: true
    })
    gender: string;

    @Prop()
    bio?: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop({ type: String, default: null })
    refresh_token: string | null;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Chenel' }], default: [] })
    chenel_Id: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(Users);