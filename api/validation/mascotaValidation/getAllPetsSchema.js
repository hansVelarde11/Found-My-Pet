const Joi = require('joi');

const getAllPetsSchema = Joi.object({
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
    getAllPetsSchema
  };
  