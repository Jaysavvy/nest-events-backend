import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Input/create.user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // if (createUserDto.password !== createUserDto.retypedPassword) {
    //   throw new BadRequestException(['Passwords do not match']);
    // }

    // const existingUser = await this.userRepository.findOne({
    //   where: [
    //     { username: createUserDto.username },
    //     { email: createUserDto.email },
    //   ],
    // });

    // if (existingUser) {
    //   throw new BadRequestException(['User already exists']);
    // }

    const user = await this.userService.create(createUserDto);

    return {
      ...user,
      token: this.authService.getTokenForUser(user),
    };
  }
}
