require('dotenv').config();
const mongoose = require('mongoose');
const Config = require('./config');
const app = require('./app');
require('./startupMiddlewares');
require('./routes');

const {
  SERVER_PORT,
  DB_AUTHDB,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  } = Config;

console.log('Initiating server...');
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});