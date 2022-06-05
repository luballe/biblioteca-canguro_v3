'use strict';
var path = require('path')
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const User = require('../User/getUser')
const CreateSession = require('../Session/create')

const login = async (req, res) => {
  try {
    let username = req.body.username
    let password = req.body.password
    // console.log('username: ',username)
    // console.log(username)
    // console.log('password: ',password)
    // console.log(password)
    var user = await User(username)
    if (user.length == 0){
      console.log(`User ${username} not found`)
      //return res.status(200).send("Wrong user or password!");
      res.sendFile(path.join(__dirname + '../../../static/main/index2.html'));
    }
    else{
      console.log(`User ${username} found`)
      // const saltRounds = 10;
      // let new_hash = ''
      // bcrypt.hash(password, saltRounds, function(err, hash) {
      //   new_hash = hash
      //   console.log(new_hash)
      //   console.log(user[0].hash)
      // });
      // let result = false
      if (!await bcrypt.compare(password, user[0].hash)){
        console.log(`Wrong Password: ${password}`)
        res.sendFile(path.join(__dirname + '../../../static/main/index2.html'));
      }
      else{
        
        let token = CreateSession(user[0].id)
        return res.status(200).send(user)
      }

    }

  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = login;
