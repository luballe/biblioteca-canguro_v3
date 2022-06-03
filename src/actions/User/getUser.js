'use strict';
const User = require('../../models/user');

const getUser = async (username) => {
  try {
    const userDoc = await User.find({'username': username});
    return userDoc;
  } catch (e) {
      console.log(e.message);
  }
};

module.exports = getUser;
