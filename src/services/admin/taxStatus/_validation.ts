import { model } from "mongoose";
import Joi from "joi";
import { taxStatusSchema } from "../../../models/taxStatus";

export const TaxStatus = model("TaxStatus", taxStatusSchema);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    taxCode: Joi.string().required().label("tax code"),
    taxName: Joi.string().required().label("tax name"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    taxCode: Joi.string().required().label("tax code"),
    taxName: Joi.string().required().label("tax name"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateDelete = (data: any) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required().label("ID"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
