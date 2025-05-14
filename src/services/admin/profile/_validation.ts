import { model } from "mongoose";
import Joi from "joi";
import { userSchema } from "../../../models/user";

export const User = model("User", userSchema);

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    emailId: Joi.string().email().required().label("Email"),
    phone: Joi.string().required().label("Phone"),
    gender: Joi.string().required().label(" Gender"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
