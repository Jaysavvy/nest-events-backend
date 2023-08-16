import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [LocalStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
