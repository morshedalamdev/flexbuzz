import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  synchronize: process.env.DB_SYNC === "true" || false,
  autoLoad: process.env.DB_AUTO_LOAD_ENTITIES === "true" || true,
}));
