import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id') // /events/1
  findOne(@Param('id') id: string) {
    const event = this.events.find((event) => event.id === parseInt(id));

    return event;
  }

  @Post() // /events
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };

    this.events.push(event);
    return event;
  }

  @Patch(':id') // /events/1
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === parseInt(id));

    this.events[index] = {
      ...this.events[index], // { id: 1, name: 'Event 1', ... }
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    return this.events[index];
  }

  @Delete(':id') // /events/1
  @HttpCode(204)
  remove(@Param('id') id) {
    this.events = this.events.filter((event) => event.id !== parseInt(id));
  }
}
