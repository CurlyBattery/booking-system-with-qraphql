import { Role } from '../../../generated/prisma';

export type AccessUser = {
  userId: string;
  role: Role;
};
