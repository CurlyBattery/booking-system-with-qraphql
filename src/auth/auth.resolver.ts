import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '../user/entities/user.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload.entity';
import { SignInInput } from './dto/sign-in.input';
import { GqlAccessGuard } from './guards/gql-access.guard';
import { UserService } from '../user/user.service';
import { CurrentUser } from '@app/decorators';
import type { AccessUser } from './types/access-user';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => User)
  signUp(@Args('registerInput') input: CreateUserInput) {
    return this.authService.registerUser(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('loginInput') input: SignInInput) {
    const user = await this.authService.validateLocalUser(input);

    return await this.authService.login(user);
  }

  @UseGuards(GqlAccessGuard)
  @Query('getAuthenticatedUser')
  async authenticate(@CurrentUser() userFromRequest: AccessUser) {
    const authenticatedUser = await this.userService.findOne(
      userFromRequest.userId,
    );

    return authenticatedUser;
  }
}
