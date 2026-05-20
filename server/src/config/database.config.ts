import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === "true" || false,
  synchronize: process.env.DB_SYNC === "true" || false,
  autoLoad: process.env.DB_AUTO_LOAD_ENTITIES === "true" || true,
}));
