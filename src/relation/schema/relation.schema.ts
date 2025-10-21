import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type RelationDocument = HydratedDocument<Relation>;

@Schema({ versionKey: false })
export class Relation {
    @Prop()
    name: string;

    @Prop({
        type: mongoose.Schema.ObjectId,
        ref: "Users"
    })
    user1: Types.ObjectId

    @Prop({
        type: mongoose.Schema.ObjectId,
        ref: "Users"
    })
    user2: Types.ObjectId
}

export const RelationSchema = SchemaFactory.createForClass(Relation)