const Joi = require("joi");

const deleteSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "string.base": "El ID de la etiqueta debe ser una cadena",
    "string.guid": "El ID de la etiqueta debe ser un UUIDv4 válido",
    "string.empty": "El ID de la etiqueta no debe estar vacío",
    "any.required": "El ID de la etiqueta es requerido",
  }),
});

module.exports = deleteSchema;
