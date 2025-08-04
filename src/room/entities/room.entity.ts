import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Venue } from '../../venue/entities/venue.entity';

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
}
