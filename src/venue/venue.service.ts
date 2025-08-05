import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VenueService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVenueInput: CreateVenueInput) {
    return this.prisma.venue.create({ data: createVenueInput });
  }

  async update(id: string, updateVenueInput: UpdateVenueInput) {
    await this.findOne(id);

    return this.prisma.venue.update({
      data: updateVenueInput,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.venue.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.venue.findMany({
      include: {
        rooms: true,
      },
    });
  }

  async findOne(id: string) {
    const venue = await this.prisma.venue.findUnique({ where: { id } });
    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    return this.prisma.venue.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });
  }
}
