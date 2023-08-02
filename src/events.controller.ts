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
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find;
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      where: {
        id: MoreThan(parseInt('2')),
      },

      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id') // /events/1
  async findOne(@Param('id') id: string) {
    return await this.repository.findOneOrFail({
      where: { id: parseInt(id) },
    });
  }

  @Post() // /events
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOneOrFail(id);

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id') // /events/1
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = this.repository.findOneOrFail(id);
    await this.repository.remove(event as any);
  }
}
