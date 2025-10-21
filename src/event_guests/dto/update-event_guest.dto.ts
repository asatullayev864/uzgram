import { PartialType } from '@nestjs/mapped-types';
import { CreateEventGuestDto } from './create-event_guest.dto';

export class UpdateEventGuestDto extends PartialType(CreateEventGuestDto) {}
