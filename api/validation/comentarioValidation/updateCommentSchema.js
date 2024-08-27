const Joi = require('joi');

const updateCommentSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'El ID del comentario debe ser una cadena',
    'string.uuid': 'El ID del comentario debe ser un UUID válido',
    'any.required': 'El ID del comentario es requerido',
  }),
  content: Joi.string().trim().required().messages({
    'string.base': 'El contenido del comentario debe ser una cadena',
    'any.required': 'El contenido del comentario es requerido',
  }),
});

module.exports = updateCommentSchema;
