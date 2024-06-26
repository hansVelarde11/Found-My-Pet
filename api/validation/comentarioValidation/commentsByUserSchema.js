const Joi = require('joi');

const commentsByUserSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'El ID del usuario debe ser una cadena',
    'string.uuid': 'El ID del usuario debe ser un UUID válido',
    'any.required': 'El ID del usuario es requerido',
  }),
  page: Joi.number().integer().min(1).optional().messages({
    'number.base': 'La página debe ser un número',
    'number.integer': 'La página debe ser un número entero',
    'number.min': 'La página debe ser un número entero positivo',
  }),
  limit: Joi.number().integer().min(1).optional().messages({
    'number.base': 'El límite debe ser un número',
    'number.integer': 'El límite debe ser un número entero',
    'number.min': 'El límite debe ser un número entero positivo',
  }),
});

module.exports = commentsByUserSchema;
