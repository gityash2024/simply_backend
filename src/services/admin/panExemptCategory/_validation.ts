import { model } from "mongoose";
import Joi from "joi";
import { panExemptCategorySchema } from "../../../models/panExemptCategory";

export const PanExemptCategory = model(
  "PanExemptCategory",
  panExemptCategorySchema
);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    category: Joi.string().required().label("category"),
    description: Joi.string().required().label("description"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    category: Joi.string().required().label("category"),
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
