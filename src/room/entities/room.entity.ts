import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Venue } from '../../venue/entities/venue.entity';
import { Booking } from '../../booking/entities/booking.entity';

@ObjectType()
export class Room {
  @Field((type) => String)
  id: string;

  @Field((type) => Int)
  @IsNumber()
  capacity: number;

  @Field((type) => String)
  @IsString()
  venueId: string;

  @Field((type) => Venue, { nullable: true })
  venue?: Venue | null;

  @Field((type) => [Booking], { nullable: true })
  bookings: [Booking] | null;
}
