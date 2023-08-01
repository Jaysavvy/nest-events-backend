import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // default port for mysql,
      username: 'root',
      password: 'example',
      database: 'nest-events',
    }),
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
