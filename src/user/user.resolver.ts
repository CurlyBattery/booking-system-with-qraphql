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
import { Role } from '../../generated/prisma';
import { Public, Roles } from '@app/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Roles([Role.ADMIN])
  @UseGuards(RolesGuard)
  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Public()
  @Query('getUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Query('getUser')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Public()
  @ResolveField()
  async bookings(@Root() user: User) {
    return this.prisma.booking.findMany({
      where: { userId: user.id },
    });
  }
}
