import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { Role as RoleDB } from '../../../generated/prisma';
import { Role } from '../../generated/graphql';
import { Booking } from '../../booking/entities/booking.entity';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  name: string;

  @Field(() => Role)
  @IsOptional()
  role?: RoleDB;

  @Field(() => [Booking], { nullable: true })
  bookings: [Booking] | null;
}
