const Joi = require('joi');

const savePreferencesSchema = Joi.object({
  notification_preferences: Joi.object().optional(),
  privacy_settings: Joi.object().optional(),
});

module.exports = {
  savePreferencesSchema,
};
