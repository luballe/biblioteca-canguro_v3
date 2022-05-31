'use strict';
const httpStatus = require('http-status');
const User = require('../../models/user');

const getMe = async (req, res) => {
  try {
    return res.json(req.locals.user);
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = getMe;
