import { Request, Response } from "express";
import { User, validateUpdate } from "./_validation";
import _ from "lodash";

const userView = async (user: any) => {
  user = _.pick(user, ["firstName", "lastName", "emailId", "phone", "gender"]);
  return user;
};

export const view = async (req: Request, res: Response) => {
  let user: any = await User.findOne({ _id: req.body.uid }).select({
    password: 0,
    otp: 0,
  });
  if (!user) return res.status(400).json({ message: "No record found." });

  res.status(200).json({ data: user });
};

export const personalDetailsUpdate = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let user: any = await User.findOne({ _id: req.body.uid });
  if (!user) return res.status(404).json({ message: "No record found." });

  user = _.assign(
    user,
    _.pick(req.body, ["firstName", "lastName", "emailId", "gender", "phone"])
  );

  user.updatedAt = new Date().toISOString();
  user = await user.save();
  user = await userView(user);

  res.status(200).json({ message: "Profile updated successfully." });
};
