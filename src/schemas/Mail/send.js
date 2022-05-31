'use strict';

const Joi = require('joi');

const sendEmail = Joi.object({
  to: Joi.string().required(),
  subject: Joi.string().required(),
  text: Joi.string()
});

module.exports = sendEmail;