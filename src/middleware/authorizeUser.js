const authorizeUser = (validTypes) => {
  return async (req, res, next) => {
    const user = req.locals.user;
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (validTypes) {
      if (!Array.isArray(validTypes)) {
        validTypes = [validTypes];
      }

      // false if none of user types is in valid types
      if (!user.hasTypes(validTypes)) {
        return res.status(403).json({ message: 'Not enough privileges' });
      }
    }

    next();
  };
};

module.exports = authorizeUser;