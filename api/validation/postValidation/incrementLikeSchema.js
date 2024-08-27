const Joi = require('joi');

const incrementLikeSchema = Joi.object({
    idPost: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'string.guid': 'El idPost debe ser un UUID válido',
      'any.required': 'El idPost es un campo obligatorio'
    })
  });
  
  module.exports = {
    incrementLikeSchema
  };
  