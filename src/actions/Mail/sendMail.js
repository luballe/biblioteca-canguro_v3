'use strict';

const httpStatus = require('http-status');
const mailService = require('../../lib/utils/mailService');

const sendMail = async (req, res) => {
  try {

    let mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    };

    mailService.sendMail(mailOptions,function(err,data){
      if (err){
        return res.status(httpStatus.UNAUTHORIZED).json({});
      }
      else {
        return res.status(httpStatus.OK).json({'status': 'Email Sent'});  
      }
    })
    
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = sendMail;