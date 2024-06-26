const Joi = require("joi");

const getAllPetsByTagsSchema = Joi.object({
  query: Joi.object({
    tags: Joi.string().required().messages({
      "string.base": "Las etiquetas deben ser proporcionadas como una cadena separada por comas",
      "string.empty": "Las etiquetas no deben estar vacías",
      "any.required": "Se requieren etiquetas para realizar la búsqueda",
    }),
  }),
});

module.exports = getAllPetsByTagsSchema;
