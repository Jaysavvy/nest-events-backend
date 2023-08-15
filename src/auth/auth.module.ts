import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LocalStrategy],
})
export class AuthModule {}
