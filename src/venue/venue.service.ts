import { Injectable } from '@nestjs/common';

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
    return this.prisma.venue.update({
      data: updateVenueInput,
      where: { id },
    });
  }

  async remove(id: string) {
    console.log(id);
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
    return this.prisma.venue.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });
  }
}
