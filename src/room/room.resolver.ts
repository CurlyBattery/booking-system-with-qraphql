import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Resolver('Room')
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

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
}
