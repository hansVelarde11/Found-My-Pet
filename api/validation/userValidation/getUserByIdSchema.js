const Joi = require('joi');

const getUserByIdSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'El ID debe ser un UUID válido'
  })
});

module.exports = {
  getUserByIdSchema,
};
