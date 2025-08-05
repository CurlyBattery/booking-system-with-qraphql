import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, RoomModule],
  providers: [BookingResolver, BookingService],
})
export class BookingModule {}
