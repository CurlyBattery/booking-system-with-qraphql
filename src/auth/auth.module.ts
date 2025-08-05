import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AccessStrategy } from './strategies/access.strategy';
import { APP_GUARD } from '@nestjs/core';
import { GqlAccessGuard } from './guards/gql-access.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AccessStrategy,
    {
      provide: APP_GUARD,
      useClass: GqlAccessGuard,
    },
  ],
})
export class AuthModule {}
