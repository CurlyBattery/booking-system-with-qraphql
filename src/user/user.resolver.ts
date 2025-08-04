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

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

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
