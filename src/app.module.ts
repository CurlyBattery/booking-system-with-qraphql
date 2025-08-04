import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { VenueModule } from './venue/venue.module';
import { RoomModule } from './room/room.module';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/generated/graphql.ts'),
        },
        sortSchema: true,
      }),
    }),
    VenueModule,
    RoomModule,
    UserModule,
    BookingModule,
  ],
})
export class AppModule {}
