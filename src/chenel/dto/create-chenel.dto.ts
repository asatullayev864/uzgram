import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChenelDto {
    @IsMongoId({ message: "user_id noto'g'ri formatda" })
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    status: string;

    @IsString()
    @IsOptional()
    description: string;
}
