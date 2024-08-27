const Joi = require('joi');

const registerPetSchema = Joi.object({
  user_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'El user_id debe ser un UUID válido',
    'any.required': 'El user_id es un campo obligatorio'
  }),
  nombre: Joi.string().max(255).required().messages({
    'string.base': 'El nombre debe ser una cadena',
    'string.empty': 'El nombre no debe estar vacío',
    'string.max': 'El nombre no debe exceder los {#limit} caracteres',
    'any.required': 'El nombre es un campo obligatorio'
  }),
  especie: Joi.string().max(100).required().messages({
    'string.base': 'La especie debe ser una cadena',
    'string.empty': 'La especie no debe estar vacía',
    'string.max': 'La especie no debe exceder los {#limit} caracteres',
    'any.required': 'La especie es un campo obligatorio'
  }),
  raza: Joi.string().max(100).optional().messages({
    'string.base': 'La raza debe ser una cadena',
    'string.max': 'La raza no debe exceder los {#limit} caracteres'
  }),
  color: Joi.string().max(100).optional().messages({
    'string.base': 'El color debe ser una cadena',
    'string.max': 'El color no debe exceder los {#limit} caracteres'
  }),
  edad: Joi.number().integer().min(0).optional().messages({
    'number.base': 'La edad debe ser un número entero',
    'number.min': 'La edad debe ser al menos {#limit}'
  }),
  sexo: Joi.string().valid('Macho', 'Hembra').optional().messages({
    'any.only': 'El sexo debe ser "Macho" o "Hembra"'
  }),
  descripcion: Joi.string().optional().allow('').max(5000).messages({
    'string.base': 'La descripción debe ser una cadena',
    'string.max': 'La descripción no debe exceder los {#limit} caracteres'
  }),
  fecha_perdida: Joi.date().optional().messages({
    'date.base': 'La fecha de pérdida debe ser una fecha válida'
  }),
  estado: Joi.string().max(100).optional().messages({
    'string.base': 'El estado debe ser una cadena',
    'string.max': 'El estado no debe exceder los {#limit} caracteres'
  }),
  imagen_urls: Joi.array().items(Joi.string().uri()).optional().messages({
    'array.base': 'Las URLs de imagen deben ser proporcionadas como una matriz de cadenas URI válidas',
    'string.uri': 'Cada URL de imagen debe ser una URI válida'
  }),
  etiquetas: Joi.array().items(Joi.string().max(50)).optional().messages({
    'array.base': 'Las etiquetas deben ser proporcionadas como una matriz de cadenas',
    'string.base': 'Cada etiqueta debe ser una cadena',
    'string.max': 'Cada etiqueta no debe exceder los {#limit} caracteres'
  }),
  created_at: Joi.date().default(Date.now).messages({
    'date.base': 'La fecha de creación debe ser una fecha válida'
  })
});

module.exports = {
  registerPetSchema
};
