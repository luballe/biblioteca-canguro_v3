'use strict';
const httpStatus = require('http-status');
const User = require('../../models/user');

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await User.findById(id);
    return res.json(userDoc);
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = getUser;
