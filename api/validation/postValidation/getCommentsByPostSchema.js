const Joi = require('joi');

const getCommentsByPostSchema = Joi.object({
    idPost: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'string.guid': 'El idPost debe ser un UUID válido',
      'any.required': 'El idPost es un campo obligatorio'
    }),
    page: Joi.number().integer().min(1).optional().messages({
      'number.base': 'El número de página debe ser un entero',
      'number.min': 'El número de página debe ser al menos {#limit}'
    }),
    limit: Joi.number().integer().min(1).optional().messages({
      'number.base': 'El límite debe ser un entero',
      'number.min': 'El límite debe ser al menos {#limit}'
    })
  });
  
  module.exports = {
    getCommentsByPostSchema
  };
  