import { User } from "../user.entity";

export const toPublicUser = (user: User): User => ({
  ...user,
  password: undefined as unknown as string,
  deletedAt: undefined as unknown as Date,
});
