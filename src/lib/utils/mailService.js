const nodemailer = require('nodemailer');
const Config = require('../../config');

const {
  MAIL_SERVICE,
  MAIL_AUTH_TYPE,
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN
} = Config;

const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  auth: {
    type: MAIL_AUTH_TYPE,
    user: MAIL_USER,
    clientId: MAIL_CLIENT_ID,
    clientSecret: MAIL_CLIENT_SECRET,
    refreshToken: MAIL_REFRESH_TOKEN
  }
});

const sendMail = async (mailOptions,callback) => {
  await transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        return callback(new Error(err))
      } else {
        return callback(null);
      }
    });
};

const mailService = {
  transporter,
  sendMail
};

module.exports = mailService;



