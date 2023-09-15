import { Resolver } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { Query, UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from './auth-gaurd-jwt-gql';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuardJwtGql)
  public async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
