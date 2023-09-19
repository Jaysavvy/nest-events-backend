import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from './users.controller';
import { AuthResolver } from './auth.resolver';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserDoesNotExistConstraint } from './validation/user-does-not-exists.constraint';

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
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    AuthResolver,
    UserResolver,
    UserService,
    UserDoesNotExistConstraint,
  ],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
