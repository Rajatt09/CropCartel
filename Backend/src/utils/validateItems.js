import Joi from "joi";
import { ApiError } from "./ApiError.js";

export default function validateItems(req, res, next) {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
    basePrice: Joi.number().required(),
    status: Joi.string().required(),
    description: Joi.string(),
    // Include timePeriod in the product object schema
    timePeriod: Joi.date().allow(null), // You can adjust this validation as needed
    cropImage: Joi.any(),
  });

  const result = productSchema.validate(req.body, { abortEarly: false });
  const err = result.error;

  if (err) {
    // throw new AppError(err.message, 403);
    console.log("error occur during jio validation: ", err.message);
    return res.status(404).json(new ApiError(404, "error during validation"));
  }

  return next();
}
