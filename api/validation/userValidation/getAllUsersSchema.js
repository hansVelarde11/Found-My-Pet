const Joi = require('joi');

const getAllUsersSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  ciudad: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
  role: Joi.string().valid('admin', 'user').optional(),
  notification_preferences: Joi.string().optional(),
  privacy_settings: Joi.string().optional(),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).optional().default(10),
});

module.exports = {
  getAllUsersSchema,
};
