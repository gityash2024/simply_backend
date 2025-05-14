import { model } from "mongoose";
import Joi from "joi";
import { stateSchema } from "../../../models/state";

export const State = model("State", stateSchema);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("code"),
    state: Joi.string().required().label("state"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    code: Joi.string().required().label("code"),
    state: Joi.string().required().label("state"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateDelete = (data: any) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required().label("ID"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
