import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { VenueModule } from './venue/venue.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
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
  ],
})
export class AppModule {}
