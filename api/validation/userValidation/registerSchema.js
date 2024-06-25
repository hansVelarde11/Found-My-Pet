const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9]{1,15}$/)
    .required()
    .messages({
      'string.empty': 'El username es obligatorio',
      'string.pattern.base': 'El username debe contener solo letras y números y tener máximo 15 caracteres',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'El email es obligatorio',
      'string.email': 'El email debe tener un formato válido',
    }),
  password: Joi.string()
    .min(4)
    .max(15)
    .regex(/^(?=.*[A-Z])(?=.*\d).{4,15}$/)
    .required()
    .messages({
      'string.empty': 'El password es obligatorio',
      'string.min': 'El password debe tener al menos {#limit} caracteres',
      'string.max': 'El password no debe tener más de {#limit} caracteres',
      'string.pattern.base': 'El password debe contener al menos una mayúscula y un numero',
    }),
  first_name: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'El firstname debe contener solo letras',
    }),
    last_name: Joi.string()
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'El lastname debe contener solo letras',
    }),

  phone_number: Joi.string()
    .regex(/^[0-9]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'El phone number debe contener solo números',
    }),
  date_of_birth: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.isoDate': 'El date of birth debe tener un formato de fecha ISO válido',
    }),
  profile_picture_url: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'El profile picture URL debe ser una URL válida',
    }),
  bio: Joi.string()
    .max(150)
    .optional()
    .messages({
      'string.max': 'El bio no debe tener más de {#limit} caracteres',
    }),
  address: Joi.string()
    .optional(),
  city: Joi.string()
    .optional(),
  state: Joi.string()
    .optional(),
  notification_preferences: Joi.object()
    .optional(),
  privacy_settings: Joi.object()
    .optional(),
  is_active: Joi.boolean()
    .optional(),
  role: Joi.string()
    .valid('admin', 'user')
    .required()
    .messages({
      'string.empty': 'El role es obligatorio',
      'any.only': 'El role debe ser "admin" o "user"',
    }),
}).options({ abortEarly: false });

module.exports = {
  registerSchema
};
