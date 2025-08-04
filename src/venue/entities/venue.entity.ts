import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Room } from '../../room/entities/room.entity';

@ObjectType()
export class Venue {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  @IsString()
  name: string;

  @Field((type) => String, { nullable: true })
  description?: string | null;

  @Field((type) => String)
  @IsString()
  location: string;

  @Field((type) => [Room], { nullable: true })
  rooms?: [Room] | null;
}
