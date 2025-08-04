import { Injectable } from '@nestjs/common';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingInput: CreateBookingInput) {
    return this.prisma.booking.create({
      data: createBookingInput,
    });
  }

  async update(id: string, updateBookingInput: UpdateBookingInput) {
    return this.prisma.booking.update({
      data: updateBookingInput,
      where: { id },
    });
  }

  async remove(id: string) {
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
