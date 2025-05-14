import { model } from "mongoose";
import Joi from "joi";
import { clientHoldingSchema } from "../../../models/clientHolding";

export const ClientHolding = model("ClientHolding", clientHoldingSchema);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("Code"),
    details: Joi.string().required().label("Details"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("Code"),
    details: Joi.string().required().label("Details"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateDelete = (data: any) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required().label("ID"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
