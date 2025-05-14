import { model } from "mongoose";
import Joi from "joi";
import { countrySchema } from "../../../models/country";

export const Country = model("Country", countrySchema);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("code"),
    name: Joi.string().required().label("name"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("code"),
    name: Joi.string().required().label("name"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateDelete = (data: any) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required().label("ID"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
