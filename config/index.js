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
  locationLqAPIUrl: process.env.LOCATIONLQ_API_URL || 'https://eu1.locationiq.com/v1/search.php?key=*KEY&q="*ADRESS"&format=json',
  locationLqAPIKey: process.env.LOCATIONLQ_API_KEY,
  glovoAPIDomain: process.env.API_URL || 'https://api.glovoapp.com/',
  glovoAPIKey: process.env.API_KEY,
  // eslint-disable-next-line no-useless-escape
  emailReg: process.env.EMAIL_REG || /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  cryptoSecretKey: process.env.CRYPTO_SECRET_KEY,
};
