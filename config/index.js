import dotenv from 'dotenv-safe';

dotenv.config({
  allowEmptyValues: false,
  path: './.env',
  example: './.env.example',
});

export default {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3051,
  sqlitePath: process.env.SQLITE_PATH || './dataBase/sqlite.db',
  discount: process.env.DISCOUNT || 20,
  redisDataLifeTime: process.env.REDIS_DATA_LIFE_TIME || 10,
  locationApiUrl: process.env.LOCATION_API || 'http://127.0.0.1:3052/api/v1/location',
  glovoAPIDomain: process.env.GLOVO_API || 'http://127.0.0.1:3053/api/v1/orders',
  glovoAPIKey: process.env.API_KEY,
  cryptoSecretKey: process.env.CRYPTO_SECRET_KEY,
  jwtTokenKey: process.env.JWT_TOKEN_KEY,
};
