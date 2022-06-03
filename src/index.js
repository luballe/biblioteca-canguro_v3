require('dotenv').config();
const mongoose = require('mongoose');
const Config = require('./config');
const app = require('./app');
require('./startupMiddlewares');
require('./routes');

const { SERVER_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_AUTH_SOURCE} = Config;
const mongoURL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH_SOURCE}&w=1`
// console.log(mongoURL)

console.log(`Connecting to DB "${DB_NAME}"...`);
mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log(`Connected to "${DB_NAME}"!`);

console.log('Initiating server...');
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});