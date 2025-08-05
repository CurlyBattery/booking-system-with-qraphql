import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'nestjs-prisma';

import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { GqlAccessGuard } from '../auth/guards/gql-access.guard';
import { Role } from '../../generated/prisma';
import { Roles } from '@app/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(GqlAccessGuard)
  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Roles([Role.ADMIN])
  @UseGuards(GqlAccessGuard, RolesGuard)
  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Query('getUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Query('getUser')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @ResolveField()
  async bookings(@Root() user: User) {
    return this.prisma.booking.findMany({
      where: { userId: user.id },
    });
  }
}
