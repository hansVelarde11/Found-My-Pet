const Joi = require("joi");

const getAllPostsByTagSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().guid({ version: "uuidv4" }).required().messages({
      "string.base": "El ID de la etiqueta debe ser una cadena",
      "string.guid": "El ID de la etiqueta debe ser un UUIDv4 válido",
      "string.empty": "El ID de la etiqueta no debe estar vacío",
      "any.required": "El ID de la etiqueta es requerido",
    }),
  }),
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "La página debe ser un número",
      "number.integer": "La página debe ser un número entero",
      "number.min": "La página debe ser como mínimo 1",
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      "number.base": "El límite debe ser un número",
      "number.integer": "El límite debe ser un número entero",
      "number.min": "El límite debe ser como mínimo 1",
      "number.max": "El límite no puede ser mayor a 100",
    }),
  }),
});

module.exports = getAllPostsByTagSchema;
