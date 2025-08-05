import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';

import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.service';
import { SignInInput } from './dto/sign-in.input';
import { User } from '../user/entities/user.entity';
import { AuthPayload } from './entities/auth-payload.entity';
import { AccessUser } from './types/access-user';
import { AuthJwtPayload } from './types/auth-jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(input: CreateUserInput) {
    const hashedPassword = await hash(input.password);

    const newUser = await this.userService.create({
      ...input,
      password: hashedPassword,
    });

    return newUser;
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async generateAccessToken(userId: string) {
    const payload: AuthJwtPayload = {
      sub: {
        userId,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async login(user: Omit<User, 'bookings'>): Promise<AuthPayload> {
    const { accessToken } = await this.generateAccessToken(user.id);

    return {
      userId: user.id,
      accessToken,
      role: user.role,
    };
  }

  async validateAccessUser(userId: string) {
    const user = await this.userService.findOne(userId);
    const accessUser: AccessUser = {
      userId: user.id,
      role: user.role,
    };
    return accessUser;
  }
}
