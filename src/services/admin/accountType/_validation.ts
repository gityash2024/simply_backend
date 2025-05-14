import { model } from "mongoose";
import { accountTypeSchema } from "../../../models/accountType";
import Joi from "joi";

export const AccountType = model("AccountType", accountTypeSchema);

export const validateAdd = (data: any) => {
  const schema = Joi.object({
    accountCode: Joi.string().required().label("account code"),
    description: Joi.string().required().label("description"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    accountCode: Joi.string().required().label("account code"),
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
