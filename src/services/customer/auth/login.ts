import { Request, Response } from "express";
import _ from "lodash";
import {
  Customer,
  validateLogin,
  validateOtp,
  validateSendOtp,
  validateSignup,
} from "./_validation";
import { decrypt } from "../../../helper/encription";

export const signup = async (req: Request, res: Response) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({
    inMobileNumber: req.body.inMobileNumber,
  });
  if (customer)
    return res
      .status(400)
      .json({ error: { phone: "Mobile number is already exist!." } });

  let payload: any = _.pick(req.body, ["inMobileNumber"]);

  let newCustomer: any = new Customer(payload);
  newCustomer.otp = 12345;
  newCustomer.createdAt = new Date().toISOString();
  newCustomer.updatedAt = new Date().toISOString();

  newCustomer = await newCustomer.save();

  res.status(200).json({ success: true, message: "Sign up Successfully..." });
};

export const sendOtp = async (req: Request, res: Response) => {
  const { error } = validateSendOtp(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({
    inMobileNumber: req.body.inMobileNumber,
  });
  if (!customer)
    return res
      .status(400)
      .json({ success: false, message: "No customer Found" });

  customer.otp = 12345;
  customer = await customer.save();

  res.status(200).json({ success: true, message: "Otp Send successfully." });
};

export const loginWithUser = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ userId: req.body.userId });
  if (!customer)
    return res.status(400).json({
      success: false,
      message: "No Customer Found! please enter a right user name",
    });

  const password = decrypt(customer.password);
  if (password !== req.body.password)
    return res.status(400).json({
      success: false,
      message: "Invalid password! please try again later",
    });

  const token: any = await customer.getAccessToken();
  res.status(200).setHeader("x-auth-token", token).json({
    success: true,
    data: customer,
    message: "Customer login successfully.",
  });
};

export const loginWithMobile = async (req: Request, res: Response) => {
  const { error } = validateOtp(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({
    inMobileNumber: req.body.inMobileNumber,
  });
  if (!customer)
    return res
      .status(400)
      .json({ success: false, message: "No customer Found" });
  if (req.body.otp != customer.otp)
    return res
      .status(400)
      .json({ success: false, message: "Invalid otp! Please try again." });

  const token: any = await customer.getAccessToken();
  res.status(200).setHeader("x-auth-token", token).json({
    success: true,
    data: customer,
    message: "Customer login successfully.",
  });
};
