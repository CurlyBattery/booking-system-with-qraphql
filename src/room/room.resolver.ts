import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { PrismaService } from 'nestjs-prisma';
import { Room } from './entities/room.entity';

@Resolver('Room')
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createRoom')
  create(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomService.create(createRoomInput);
  }

  @Mutation('updateRoom')
  update(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation('removeRoom')
  remove(@Args('id') id: string) {
    return this.roomService.remove(id);
  }

  @Query('getRooms')
  findAll() {
    return this.roomService.findAll();
  }

  @Query('getRoom')
  findOne(@Args('id') id: string) {
    return this.roomService.findOne(id);
  }

  @ResolveField()
  async venue(@Root() room: Room) {
    return this.prisma.venue.findUnique({
      where: {
        id: room.venueId,
      },
    });
  }

  @ResolveField()
  async bookings(@Root() room: Room) {
    return this.prisma.booking.findMany({
      where: { roomId: room.id },
    });
  }
}
