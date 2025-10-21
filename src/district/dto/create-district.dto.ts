import mongoose from "mongoose";

export class CreateDistrictDto {
    name: string;
    regionId: mongoose.Schema.Types.ObjectId
}
