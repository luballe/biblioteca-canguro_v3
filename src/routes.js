const app = require('./app');
const Constants = require('./lib/constants');
const {
  authenticateUser,
  authorizeUser,
  validateSchema,
} = require('./middleware');

const Session = require('./actions/Session'); 
const User = require('./actions/User');
const Mail = require('./actions/Mail');
const { userSchemas, mailSchemas } = require('./schemas');


// Index
app.get(
  '/', 
  Session.getIndex
);

// Login
app.post(
  '/',
  validateSchema(userSchemas.login),
  User.login
);

// Get a user by id
app.get(
  '/user/:id',
  authenticateUser(),
  authorizeUser([
    Constants.USER_TYPES.READER,
    Constants.USER_TYPES.ADMIN,
  ]),
  validateSchema(userSchemas.get),
  User.getUser
);

// Send mail
app.post(
  '/sendMail',
  validateSchema(mailSchemas.send),
  authenticateUser(),
  Mail.sendMail
);
