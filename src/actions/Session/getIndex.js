'use strict';
var path = require('path')
const httpStatus = require('http-status');

const getIndex = async (req, res) => {
  try {
    // return res.status(200).send('OKi doki');
    res.sendFile(path.join(__dirname + '../../../static/main/index.html'));
    return 
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = getIndex;
