import { model } from "mongoose";
import { customerSchema } from "../../../models/customer";
import Joi from "joi";

export const Customer = model("Customer", customerSchema);

export const validateSignup = (data: any) => {
  const schema = Joi.object({
    inMobileNumber: Joi.string().required().label("Mobile Number"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateSendOtp = (data: any) => {
  const schema = Joi.object({
    inMobileNumber: Joi.string().required().label("Mobile Number"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateOtp = (data: any) => {
  const schema = Joi.object({
    inMobileNumber: Joi.string().required().label("Mobile Number"),
    otp: Joi.string().required().label("Otp"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("User ID"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
