'use strict';
const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().required(),
});

module.exports = createUser;
