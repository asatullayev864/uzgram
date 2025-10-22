import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Users } from "../../users/schema/user.schema";


export type ChatDocument = HydratedDocument<Chat>;

@Schema({ versionKey: false })
export class Chat {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    user_1Id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    user_2Id: string;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
