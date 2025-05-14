import { Request, Response } from "express";
import { User, validateLogin, validateSignup } from "./_validation";
import { decrypt, encrypt } from "../../../helper/encription";
import _ from "lodash";

export const signup = async (req: Request, res: Response) => {
  const { error } = validateSignup(req.body);
  if (error) throw error;

  let user: any = await User.findOne({
    emailId: req.body.emailId,
  });
  if (user)
    return res
      .status(400)
      .json({ error: { phone: "Email is already exist!." } });

  let payload: any = _.pick(req.body, [
    "firstName",
    "lastName",
    "emailId",
    "phone",
    "gender",
  ]);
  payload.password = await encrypt(req.body.password);

  let newUser: any = new User(payload);
  newUser.otp = 12345;
  newUser.createdAt = new Date().toISOString();
  newUser.updatedAt = new Date().toISOString();

  newUser = await newUser.save();

  res.status(200).json({ message: "Sign up Successfully..." });
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) throw error;

  let user: any = await User.findOne({ emailId: req.body.emailId });
  if (!user) return res.status(400).json({ message: "No user Found" });

  const userPassword = decrypt(user.password);
  if (userPassword !== req.body.password)
    return res
      .status(400)
      .json({ message: "Invalid password! Please try again." });

  const token: any = await user.getAccessToken();
  res
    .status(200)
    .setHeader("x-auth-token", token)
    .json({ message: "User login successfully." });
};
