'use strict';
const httpStatus = require('http-status');
const Constants = require('../../lib/constants');
const User = require('../../models/user');

const getUsers = async (req, res) => {
  try {
    // console.log(req.locals.data)
    const { deleted,blocked } = req.locals.data;
    var filter = {
      "type" : Constants.USER_TYPES.SUMMONER
    }
    if(deleted != undefined){
      filter.deleted = deleted
    }
    else{
      filter.deleted = false
    }
    if(blocked != undefined){
      filter.blocked = blocked
    }
    else{
      filter.blocked = false
    }

    const userDoc = await User.find(filter);
    return res.json(userDoc);
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = getUsers;
