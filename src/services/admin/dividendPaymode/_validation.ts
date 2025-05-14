import { model } from "mongoose";
import Joi from "joi";
import { dividendPaymodeSchema } from "../../../models/dividendPaymode";

export const DividendPaymode = model("DividendPaymode", dividendPaymodeSchema);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("code"),
    description: Joi.string().required().label("description"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("code"),
    description: Joi.string().required().label("description"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateDelete = (data: any) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required().label("ID"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
