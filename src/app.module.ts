import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as Joi from 'joi';

import { VenueModule } from './venue/venue.module';
import { RoomModule } from './room/room.module';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_NAME: Joi.string().required(),
        ACCESS_SECRET: Joi.string().required(),
        ACCESS_EXPIRES_IN: Joi.string().required(),
      }),
    }),
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
    AuthModule,
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
