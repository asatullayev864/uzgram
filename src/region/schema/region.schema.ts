import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { District } from '../../district/schema/district.schema';

export type RegionDocument = HydratedDocument<Region>;

@Schema({ versionKey: false })
export class Region {
    @Prop()
    name: string;

    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "District"
        }]
    })
    districts: Types.ObjectId[];


}

export const RegionSchema = SchemaFactory.createForClass(Region);