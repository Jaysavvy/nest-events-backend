import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenOutPut {
  constructor(partial?: Partial<TokenOutPut>) {
    Object.assign(this, partial);
  }

  @Field()
  token: string;
}
