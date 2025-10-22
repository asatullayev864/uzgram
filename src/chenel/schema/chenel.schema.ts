import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Users } from "../../users/schema/user.schema";

export type ChenelDocument = HydratedDocument<Chenel>;

@Schema({ versionKey: false })
export class Chenel {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    user_id: Users;

    @Prop()
    name: string;

    @Prop()
    status: string;

    @Prop()
    description: string;
}

export const chenelSchema = SchemaFactory.createForClass(Chenel);