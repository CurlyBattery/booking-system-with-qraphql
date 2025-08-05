import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [VenueModule],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
