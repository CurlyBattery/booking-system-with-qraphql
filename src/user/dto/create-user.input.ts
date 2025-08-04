import { Role } from '../../../generated/prisma';

export class CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: Role;
}
