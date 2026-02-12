import { HashingProvider } from "./hashing.provider";
export declare class BcryptProvider implements HashingProvider {
    hashPassword(password: string | Buffer): Promise<string>;
    comparePassword(password: string | Buffer, hash: string | Buffer): Promise<boolean>;
}
