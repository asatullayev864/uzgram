import { Module } from '@nestjs/common';
import { EventGuestsService } from './event_guests.service';
import { EventGuestsController } from './event_guests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventGuest, EventGuestSchema } from './schema/event_guest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventGuest.name, schema: EventGuestSchema }
    ]),
  ],
  controllers: [EventGuestsController],
  providers: [EventGuestsService],
})
export class EventGuestsModule { }
