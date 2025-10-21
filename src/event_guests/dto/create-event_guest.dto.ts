import { IsMongoId } from 'class-validator';

export class CreateEventGuestDto {
    @IsMongoId({ message: "eventId noto'g'ri formatda kiritilgan❗️" })
    eventId: string;

    @IsMongoId({ message: "userId noto'g'ri formatda kiritilgan❗️" })
    userId: string;
}