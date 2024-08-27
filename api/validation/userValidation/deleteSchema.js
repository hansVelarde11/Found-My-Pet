const Joi = require('joi');

const deleteSchema = Joi.object({
  id: Joi.string().uuid().required()
    .messages({
      'string.uuid': 'El ID debe tener un formato UUID válido',
      'any.required': 'Se requiere proporcionar el ID del usuario',
    }),
});

module.exports = {
  deleteSchema,
};
