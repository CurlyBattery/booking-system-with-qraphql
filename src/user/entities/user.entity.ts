import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '../../../generated/prisma';
import { IsEmail, IsOptional, IsString } from 'class-validator';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => String)
  @IsString()
  name: string;

  @Field((type) => Role)
  @IsOptional()
  role?: Role;
}
