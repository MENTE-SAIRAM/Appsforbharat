import Joi from 'joi';

export const registerSchema = Joi.object({
  user_id: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean().default(false)
});

export const loginSchema = Joi.object({
  user_id: Joi.string().required(),
  password: Joi.string().required()
});
