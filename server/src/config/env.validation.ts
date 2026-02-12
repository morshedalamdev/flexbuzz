import * as Joi from "joi";

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  DB_PORT: Joi.number().port().default(5432),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_TOKEN_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRATION_TIME: Joi.number().integer().positive().default(3600),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number()
    .integer()
    .positive()
    .default(86400),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
});
