const Joi = require("joi");

const getTagByNameSchema = Joi.object({
  params: Joi.object({
    name: Joi.string().trim().required(),
  }),
});

module.exports = getTagByNameSchema;
