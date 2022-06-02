'use strict';
var path = require('path')
const httpStatus = require('http-status');

const login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    console.log('username')
    console.log(username)
    console.log('password')
    console.log(password)
    // console.log('res')
    // console.log(res)
    // return res.sendFile(path.join(__dirname + '../../../static/main/index.html'));
    return res.status(200).send('OK1 dok1');
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = login;
