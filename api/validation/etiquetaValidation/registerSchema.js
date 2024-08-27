const Joi = require("joi");

const registerSchema = Joi.object({
  nombre: Joi.string().trim().required().messages({
    "string.base": "El nombre de la etiqueta debe ser una cadena",
    "string.empty": "El nombre de la etiqueta no debe estar vacío",
    "any.required": "El nombre de la etiqueta es requerido",
  }),
});

module.exports = registerSchema;
