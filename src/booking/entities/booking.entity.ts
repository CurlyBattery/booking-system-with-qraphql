import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User as UserEntity } from '../../user/entities/user.entity';
import { Room as RoomEntity } from '../../room/entities/room.entity';

import { BookingStatus, Room, User } from '../../../generated/prisma';

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
});

@ObjectType()
export class Booking {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  roomId: string;

  @Field((type) => Date)
  startTime: Date;

  @Field((type) => Date)
  endTime: Date;

  @Field((type) => BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @Field((type) => UserEntity, { nullable: true })
  user?: User | null;

  @Field((type) => RoomEntity, { nullable: true })
  room?: Room | null;
}
