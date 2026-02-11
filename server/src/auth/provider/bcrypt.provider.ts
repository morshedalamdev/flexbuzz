import { Injectable } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  public async comparePassword(
    password: string | Buffer,
    hash: string | Buffer,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
