import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // default port for mysql,
      username: 'root',
      password: 'example',
      database: 'nest-events',
      entities: [Event],
      synchronize: true,
    }),

    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
