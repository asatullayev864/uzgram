import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateChatDto {
    @IsMongoId()
    @IsNotEmpty()
    user_1Id: string;

    @IsMongoId()
    @IsNotEmpty()
    user_2Id: string;
}
