import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  async create(createBookingInput: CreateBookingInput) {
    await this.userService.findOne(createBookingInput.userId);
    await this.roomService.findOne(createBookingInput.roomId);

    const existsBooking = await this.prisma.booking.findUnique({
      where: {
        userId_roomId_startTime_endTime: {
          roomId: createBookingInput.roomId,
          userId: createBookingInput.userId,
          endTime: createBookingInput.endTime,
          startTime: createBookingInput.startTime,
        },
      },
    });
    if (existsBooking) {
      throw new ConflictException('Booking already exists');
    }

    return this.prisma.booking.create({
      data: createBookingInput,
    });
  }

  async update(id: string, updateBookingInput: UpdateBookingInput) {
    await this.findOne(id);

    return this.prisma.booking.update({
      data: updateBookingInput,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.booking.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.booking.findMany();
  }

  async findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }
}
