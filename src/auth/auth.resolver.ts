import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TokenOutPut } from './Input/token.output';
import { AuthService } from './auth.service';
import { LoginInput } from './Input/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenOutPut, { name: 'login' })
  public async login(
    @Args('input', { type: () => LoginInput })
    input: LoginInput,
  ): Promise<TokenOutPut> {
    return new TokenOutPut({
      token: this.authService.getTokenForUser(
        await this.authService.validateUser(input.username, input.password),
      ),
    });
  }
}
