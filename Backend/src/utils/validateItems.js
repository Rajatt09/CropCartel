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
    }).required(),
  });
  const result = productSchema.validate(req.body);
  //console.log(result);
  const err = result.error;
  if (err) {
    //res.send(err);
    throw new AppError(err.message, 403);
  }
  return next();
}