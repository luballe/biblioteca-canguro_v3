'use strict';

const Joi = require('joi');

const getUsers = Joi.object({
  deleted: Joi.boolean(),
  blocked: Joi.boolean()
});

module.exports = getUsers;