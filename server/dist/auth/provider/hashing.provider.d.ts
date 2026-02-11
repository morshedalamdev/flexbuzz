export declare abstract class HashingProvider {
    abstract hashPassword(password: string | Buffer): Promise<string>;
    abstract comparePassword(password: string | Buffer, hash: string | Buffer): Promise<boolean>;
}
