import { User } from "../user.entity";

export const toPublicUser = <T extends Partial<User>>(user: T) => {
  const { password: _password, deletedAt: _deletedAt, ...safeUser } = user as T & {
    password?: string;
    deletedAt?: Date | null;
  };
  return safeUser;
};
