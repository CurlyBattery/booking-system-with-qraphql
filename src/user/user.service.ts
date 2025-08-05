import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const existsUser = await this.findByEmail(createUserInput.email);
    if (existsUser) {
      throw new ConflictException('User already exists');
    }

    const hash = await bcrypt.hash(createUserInput.password, 10);

    return this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hash,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User does not exists');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    await this.findOne(id);

    return this.prisma.user.update({
      data: updateUserInput,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
