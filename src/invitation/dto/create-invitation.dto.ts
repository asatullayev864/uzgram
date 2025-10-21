import { IsMongoId, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateInvitationDto {
    @IsMongoId({ message: "eventId noto'g'ri formatda kiritilgan❗️" })
    eventId: string;

    @IsMongoId({ message: "from_user noto'g'ri formatda kiritilgan❗️" })
    from_user: string;

    @IsMongoId({ message: "to_user noto'g'ri formatda kiritilgan❗️" })
    to_user: string;

    @IsOptional()
    @IsIn(['pending', 'accepted', 'declined'], {
        message: `status faqat "pending", "accepted" yoki "declined" bo'lishi kerak❗️`,
    })
    status?: string;

    @IsOptional()
    @IsString({ message: "message matn ko'rinishida bo'lishi kerak❗️" })
    message?: string;
}