import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  issuer: process.env.JWT_TOKEN_ISSUER,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME ?? "3600",10,),
  refreshTokenExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME ?? "86400",10,),
}));
