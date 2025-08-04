import { CreateVenueInput } from './create-venue.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVenueInput extends PartialType(CreateVenueInput) {
  id: string;
}
