import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { PrismaService } from 'nestjs-prisma';
import { VenueService } from '../venue/venue.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly venueService: VenueService,
  ) {}

  async create(createRoomInput: CreateRoomInput) {
    await this.venueService.findOne(createRoomInput.venueId);

    return this.prisma.room.create({ data: createRoomInput });
  }

  async update(id: string, updateRoomInput: UpdateRoomInput) {
    await this.findOne(id);

    return this.prisma.room.update({
      data: updateRoomInput,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.room.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    if (!room) {
      throw new NotFoundException('Room does not exists');
    }

    return this.prisma.room.findUnique({ where: { id } });
  }
}
