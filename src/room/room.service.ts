import { Injectable } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomInput: CreateRoomInput) {
    return this.prisma.room.create({ data: createRoomInput });
  }

  async update(id: string, updateRoomInput: UpdateRoomInput) {
    return this.prisma.room.update({
      data: updateRoomInput,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.prisma.room.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async findOne(id: string) {
    return this.prisma.room.findUnique({ where: { id } });
  }
}
