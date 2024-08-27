const Joi = require('joi');

const deletePostSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'string.guid': 'El id debe ser un UUID válido',
      'any.required': 'El id es un campo obligatorio'
    })
  });
  
  module.exports = {
    deletePostSchema
  };
  