// npm i joi
import joi from "joi";

const product = joi.object({
  title: joi.string().min(3).max(45).required(),
  description: joi.string().min(3).max(80).required(),
  price: joi.number().required(),
  code: joi.string().required(),
});

export const JOI_VALIDATOR = { product };
