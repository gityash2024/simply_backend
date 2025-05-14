import { model } from "mongoose";
import Joi from "joi";
import { userSchema } from "../../../models/user";

export const User = model("User", userSchema);

export const validateSignup = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    emailId: Joi.string().email().required().label("Email"),
    phone: Joi.string().required().label("phone"),
    gender: Joi.string().required().label("gender"),
    password: Joi.string().required().label("password"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    emailId: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
