import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GroupDocument = HydratedDocument<Group>;

@Schema({ versionKey: false })
export class Group {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 'active' })
    status: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);