import { BookingStatus } from '../../../generated/prisma';

export class CreateBookingInput {
  userId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  status?: BookingStatus;
}
