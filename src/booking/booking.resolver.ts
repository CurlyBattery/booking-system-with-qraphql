import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { Booking } from './entities/booking.entity';
import { PrismaService } from 'nestjs-prisma';

@Resolver('Booking')
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createBooking')
  create(@Args('createBookingInput') createBookingInput: CreateBookingInput) {
    return this.bookingService.create(createBookingInput);
  }

  @Mutation('updateBooking')
  update(@Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
    return this.bookingService.update(
      updateBookingInput.id,
      updateBookingInput,
    );
  }

  @Mutation('removeBooking')
  remove(@Args('id') id: string) {
    return this.bookingService.remove(id);
  }

  @Query('getBookings')
  findAll() {
    return this.bookingService.findAll();
  }

  @Query('getBooking')
  findOne(@Args('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @ResolveField()
  async user(@Root() booking: Booking) {
    return this.prisma.user.findUnique({
      where: { id: booking.userId },
    });
  }

  @ResolveField()
  async room(@Root() booking: Booking) {
    return this.prisma.room.findUnique({
      where: { id: booking.roomId },
    });
  }
}
