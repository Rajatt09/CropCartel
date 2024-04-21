import Joi from "joi";
import AppError from "./AppError.js";

export default function validateItems(req, res, next) {
  const productSchema = Joi.object({
    product: Joi.object({
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      category: Joi.string().required(),
      basePrice: Joi.number().required(),
      status: Joi.string().required(),
      description: Joi.string(),
      // Include timePeriod in the product object schema
      timePeriod: Joi.date().allow(null) // You can adjust this validation as needed
    }).required(),
  });

  const result = productSchema.validate(req.body);
  const err = result.error;

  if (err) {
    throw new AppError(err.message, 403);
  }

  return next();
}
