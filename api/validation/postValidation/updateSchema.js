const Joi = require('joi');

const updatePostSchema = Joi.object({
    content: Joi.string().allow('').optional().max(5000).messages({
      'string.base': 'El contenido debe ser una cadena',
      'string.max': 'El contenido no debe exceder los {#limit} caracteres'
    }),
    title: Joi.string().optional().max(255).messages({
      'string.base': 'El título debe ser una cadena',
      'string.max': 'El título no debe exceder los {#limit} caracteres'
    }),
    image_urls: Joi.array().items(Joi.string().uri()).optional().messages({
      'array.base': 'Las URLs de imagen deben ser proporcionadas como una matriz de cadenas URI válidas',
      'string.uri': 'Cada URL de imagen debe ser una URI válida'
    }),
    latitude: Joi.number().optional().messages({
      'number.base': 'La latitud debe ser un número'
    }),
    longitude: Joi.number().optional().messages({
      'number.base': 'La longitud debe ser un número'
    }),
    tags: Joi.array().items(Joi.string().max(50)).optional().messages({
      'array.base': 'Las etiquetas deben ser proporcionadas como una matriz de cadenas',
      'string.base': 'Cada etiqueta debe ser una cadena',
      'string.max': 'Cada etiqueta no debe exceder los {#limit} caracteres'
    }),
    visibility: Joi.string().valid('public', 'private').optional().messages({
      'any.only': 'La visibilidad debe ser "public" o "private"'
    }),
    is_active: Joi.boolean().optional().messages({
      'boolean.base': 'El campo is_active debe ser verdadero o falso'
    })
  });
  
  module.exports = {
    updatePostSchema
  };
  