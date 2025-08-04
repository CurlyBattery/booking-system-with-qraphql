import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '../../../generated/prisma';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Booking } from '../../booking/entities/booking.entity';

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

  @Field((type) => [Booking], { nullable: true })
  bookings: [Booking] | null;
}
