import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRelationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMongoId()
    @IsNotEmpty()
    user1: string;

    @IsMongoId()
    @IsNotEmpty()
    user2: string;
}