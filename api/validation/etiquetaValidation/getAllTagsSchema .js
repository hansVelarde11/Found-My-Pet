const Joi = require("joi");

const getAllTagsSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).optional().default(10),
  }),
});

module.exports = getAllTagsSchema;
