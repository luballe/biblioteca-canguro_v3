const Joi = require('joi');

const validateSchema = (
  schema,
  { forceQuery = false, abortEarly = true } = {}
) => {
  return async (req, res, next) => {
    const user = req.locals.user;
    if (schema === undefined) {
      return res.status(500).send({
        message: 'An input schema must be defined',
      });
    }
    let selectedSchema = null;
    if (user && schema) {
      if (!Joi.isSchema(schema)) {
        //console.log('Is multi schema');
        //if schema is not a Joi schema, then it could be a plain object (schema by user type)
        if (schema[user.role] && Joi.isSchema(schema[user.role])) {
          //console.log('Selecting schema for', user.role);
          selectedSchema = schema[user.role];
        } else if (schema.default && Joi.isSchema(schema.default)) {
          //console.log('selecting default schema');
          selectedSchema = schema.default;
        } else {
          //console.log('No schema selected');
          selectedSchema = null;
        }
      } else {
        //console.log('Schema is not a multi-schema... using it');
        selectedSchema = schema;
      }
    } else {
      //console.log('Assigning the schema');
      selectedSchema = schema;
    }

    //console.log('selectedSchema', selectedSchema);
    if (selectedSchema) {
      const data = req.method === 'GET' || forceQuery ? req.query : req.body;

      try {
        const value = await selectedSchema.validateAsync(data, {
          abortEarly: abortEarly,
        });
        req.locals.data = value;
      } catch (error) {
        console.error(error);
        return res.status(422).send({
          message: 'Incoming data validation error',
          error: error,
        });
      }
    } else {
      req.locals.data = {};
    }
    next();
  };
};

module.exports = validateSchema;
