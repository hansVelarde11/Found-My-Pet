const Joi = require('joi');

const getPetsByUserSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'El ID debe ser un UUID válido'
  }),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).optional().default(10)
});

module.exports = {
  getPetsByUserSchema,
};
