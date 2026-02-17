declare const _default: (() => {
    issuer: string | undefined;
    audience: string | undefined;
    accessTokenSecret: string | undefined;
    refreshTokenSecret: string | undefined;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    issuer: string | undefined;
    audience: string | undefined;
    accessTokenSecret: string | undefined;
    refreshTokenSecret: string | undefined;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}>;
export default _default;
