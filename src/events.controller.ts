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

@Controller('/events')
export class EventsController {
  @Get()
  findAll() : id: number, name: string {}[]{
    return [
        {id: 1, name: 'First event'},
        {id: 2, name: 'Second event'},
        {id: 3, name: 'Third event'}

    ];
  }

  @Get(':id')
  findOne(@Param() id) : id: number, name: string {}[]{
    return {id: 1, name: 'First event'};
  }

  @Post()
  create(@Body() input) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input) {
    return id;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {}
}
