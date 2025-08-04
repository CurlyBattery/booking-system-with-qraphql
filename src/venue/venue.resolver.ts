import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { VenueService } from './venue.service';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { Venue as DBVenue } from '../../generated/prisma';

@Resolver('Venue')
export class VenueResolver {
  constructor(private readonly venueService: VenueService) {}

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

  @Query('getVenues')
  findAll(): Promise<DBVenue[]> {
    return this.venueService.findAll();
  }

  @Query('getVenue')
  findOne(@Args('id') id: string): Promise<DBVenue> {
    return this.venueService.findOne(id);
  }
}
