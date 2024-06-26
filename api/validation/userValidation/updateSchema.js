const Joi = require('joi');

const updateSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_]{1,15}$/)
    .messages({
      'string.pattern.base': 'El nombre de usuario no debe contener símbolos y no debe ser más largo de 15 caracteres',
    })
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({
      'string.email': 'El correo electrónico debe tener un formato válido',
    })
    .optional(),
  telefono: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'El teléfono debe contener solo números',
    })
    .optional(),
  ciudad: Joi.string().optional(),
  foto_perfil: Joi.string().uri().optional(),
  first_name: Joi.string()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      'string.pattern.base': 'El nombre debe contener solo letras',
    })
    .optional(),
  last_name: Joi.string()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      'string.pattern.base': 'El apellido debe contener solo letras',
    })
    .optional(),
  phone_number: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'El número de teléfono debe contener solo números',
    })
    .optional(),
  date_of_birth: Joi.date()
    .iso()
    .messages({
      'date.format': 'La fecha de nacimiento debe tener un formato válido',
    })
    .optional(),
  profile_picture_url: Joi.string().uri().optional(),
  bio: Joi.string()
    .max(150)
    .messages({
      'string.max': 'La biografía no debe tener más de 150 caracteres',
    })
    .optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  notification_preferences: Joi.object().optional(),
  privacy_settings: Joi.object().optional(),
  is_active: Joi.boolean().optional(),
  role: Joi.string()
    .valid('admin', 'user')
    .messages({
      'any.only': 'El rol debe ser "admin" o "user"',
    })
    .optional(),
}).options({ abortEarly: false }); // Para obtener todos los errores de validación

module.exports = {
  updateSchema,
};
