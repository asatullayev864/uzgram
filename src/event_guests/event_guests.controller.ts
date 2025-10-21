import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventGuestsService } from './event_guests.service';
import { CreateEventGuestDto } from './dto/create-event_guest.dto';
import { UpdateEventGuestDto } from './dto/update-event_guest.dto';

@Controller('event-guests')
export class EventGuestsController {
  constructor(private readonly eventGuestsService: EventGuestsService) {}

  @Post()
  create(@Body() createEventGuestDto: CreateEventGuestDto) {
    return this.eventGuestsService.create(createEventGuestDto);
  }

  @Get()
  findAll() {
    return this.eventGuestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventGuestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventGuestDto: UpdateEventGuestDto) {
    return this.eventGuestsService.update(id, updateEventGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventGuestsService.remove(id);
  }
}
