import { IsString, IsEmail, IsOptional, IsNumber, IsEnum, Min, Max, Length } from 'class-validator';
import { GenderEnum } from '../../common/enums/gender-enum';

export class CreateUserDto {
    @IsString()
    @Length(2, 50)
    name: string;

    @IsString()
    @Length(3, 30)
    user_name: string;

    @IsString()
    phone_number: string;

    @IsEnum([GenderEnum.MALE, GenderEnum.FEMALE], { message: "Gender faqat male yoki female bo'lishi mumkin" })
    gender: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsNumber()
    @Min(1)
    @Max(120)
    age: number;

    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 100)
    password: string;

    role?: string;
}