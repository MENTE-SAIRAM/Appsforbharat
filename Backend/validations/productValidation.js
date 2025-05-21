import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  brand: Joi.string().required(),
  stock: Joi.number().integer().min(0).required()
});

export default productSchema;
