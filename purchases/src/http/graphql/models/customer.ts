import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  authUserId?: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
