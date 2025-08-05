import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PrismaService } from 'nestjs-prisma';
import { GqlAccessGuard } from '../auth/guards/gql-access.guard';
import { UseGuards } from '@nestjs/common';

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
