const Joi = require('joi');

const registerCommentSchema = Joi.object({
  postId: Joi.string().uuid().required().messages({
    'string.base': 'El ID del post debe ser una cadena',
    'string.uuid': 'El ID del post debe ser un UUID válido',
    'any.required': 'El ID del post es requerido',
  }),
  userId: Joi.string().uuid().required().messages({
    'string.base': 'El ID del usuario debe ser una cadena',
    'string.uuid': 'El ID del usuario debe ser un UUID válido',
    'any.required': 'El ID del usuario es requerido',
  }),
  content: Joi.string().trim().required().messages({
    'string.base': 'El contenido del comentario debe ser una cadena',
    'any.required': 'El contenido del comentario es requerido',
  }),
});

module.exports = registerCommentSchema;
