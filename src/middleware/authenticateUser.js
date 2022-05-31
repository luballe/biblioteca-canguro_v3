// const admin = require('firebase-admin');
const User = require('../models/user');

const authenticate =
  (modelKey = 'uid', fireKey = 'uid') =>
  async (req, res, next) => {
    // Initialize locals in req data structure
    req.locals = {};
    if (req.headers.authorization) {
      const [tokenType, idToken] = req.headers.authorization.split(' ');
      if (tokenType === 'Bearer' && idToken) {
        try {
          // const decodedToken = await admin.auth().verifyIdToken(idToken);
          // // The decoded token is stored in req.locals for internal use in the server
          // req.locals.decodedToken = decodedToken;
          // // The decoded token is store in res.local for the front-end
          // res.locals.decodedToken = decodedToken;
          // const user = await User.findOne({
          //   [modelKey]: decodedToken[fireKey],
          // });
          var user = null;
          // console.log(user);
          // The user is stored in req.locals for internal use in the server
          req.locals.user = user;
          // The user is stored in res.locals for the front-end
          res.locals.user = user;
        } catch (err) {
          res.status(401).send({ message: `Invalid token: ${err.code}` });
          return;
        }
      } else {
        res.status(401).send({ message: 'Invalid token format' });
        return;
      }
    }

    next();
  };

module.exports = authenticate;
