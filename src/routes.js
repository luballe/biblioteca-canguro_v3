const app = require('./app');
const Constants = require('./lib/constants');
const {
  authenticateUser,
  authorizeUser,
  validateSchema,
} = require('./middleware');

const User = require('./actions/User');
const Mail = require('./actions/Mail');
const { userSchemas, mailSchemas } = require('./schemas');

// Index
app.get('/', function (req, res) {
  res.status(200).send('OK');
});

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
