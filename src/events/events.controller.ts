import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';

import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthGuardJwt } from 'src/auth/Input/auth-guard.jwt';
import { User } from 'src/auth/user.entity';

User;

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListEvents) {
    const events =
      await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
        filter,
        {
          total: true,
          currentPage: filter.page,
          limit: 2,
        },
      );
    return events;
  }

  // @Get('/practice')
  // async practice2() {
  //   const event = new Event();
  //   event.id = 1;

  //   const attendee = new Attendee();

  //   attendee.name = 'Jerry';
  //   attendee.event = event;

  //   await this.attendeeRepository.save(attendee);
  //   return attendee;
  // }

  // @Get('/practice')
  // async practice() {
  //   return await this.repository.find({
  //     where: {
  //       id: MoreThan(parseInt('2')),
  //     },

  //     order: {
  //       id: 'DESC',
  //     },
  //   });
  // }

  @Get(':id') // /events/1
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  @Post() // /events
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateEventDto, @CurrentUser() User: User) {
    return await this.eventsService.createEvent(input, User);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id,
    @Body() input: UpdateEventDto,
    @CurrentUser() User: User,
  ) {
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== User.id) {
      throw new ForbiddenException(
        null,
        'You are not authorized to change this event',
      );
    }

    return await this.eventsService.updateEvent(input, event);
  }

  @Delete(':id') // /events/1
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  async remove(@Param('id') id, @CurrentUser() User: User) {
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== User.id) {
      throw new ForbiddenException(
        null,
        'You are not authorized to change this event',
      );
    }

    await this.eventsService.deleteEvent(id);
  }
}
