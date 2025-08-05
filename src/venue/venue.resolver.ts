import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';

import { VenueService } from './venue.service';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { Venue as DBVenue } from '../../generated/prisma';
import { Venue } from './entities/venue.entity';
import { PrismaService } from 'nestjs-prisma';
import { Public } from '@app/decorators';

@Resolver('Venue')
export class VenueResolver {
  constructor(
    private readonly venueService: VenueService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createVenue')
  create(
    @Args('createVenueInput') createVenueInput: CreateVenueInput,
  ): Promise<DBVenue> {
    return this.venueService.create(createVenueInput);
  }

  @Mutation('updateVenue')
  update(
    @Args('updateVenueInput') updateVenueInput: UpdateVenueInput,
  ): Promise<DBVenue> {
    return this.venueService.update(updateVenueInput.id, updateVenueInput);
  }

  @Mutation('removeVenue')
  remove(@Args('id') id: string) {
    return this.venueService.remove(id);
  }

  @Public()
  @Query('getVenues')
  findAll(): Promise<DBVenue[]> {
    return this.venueService.findAll();
  }

  @Public()
  @Query('getVenue')
  findOne(@Args('id') id: string): Promise<DBVenue> {
    return this.venueService.findOne(id);
  }

  @ResolveField()
  async rooms(@Root() venue: Venue) {
    return this.prisma.room.findMany({
      where: {
        venueId: venue.id,
      },
    });
  }
}
