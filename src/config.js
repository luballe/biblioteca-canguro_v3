const Config = {
  SERVER_PORT: process.env.SERVER_PORT || 8080,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_AUTH_SOURCE: process.env.DB_AUTH_SOURCE,
};
  
module.exports = Config;