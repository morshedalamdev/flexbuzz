declare const _default: (() => {
    url: string | undefined;
    host: string;
    port: number;
    name: string | undefined;
    user: string | undefined;
    password: string | undefined;
    ssl: boolean;
    synchronize: boolean;
    autoLoad: true;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string | undefined;
    host: string;
    port: number;
    name: string | undefined;
    user: string | undefined;
    password: string | undefined;
    ssl: boolean;
    synchronize: boolean;
    autoLoad: true;
}>;
export default _default;
