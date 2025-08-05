import { Role as RoleDB } from '../../../generated/prisma';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../../generated/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  userId: string;

  @Field(() => Role)
  role: RoleDB;

  @Field()
  accessToken: string;
}
