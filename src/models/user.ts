import { Schema } from "mongoose";
import config from "config";
import { encrypt } from "../helper/encription";
import jwt from "jsonwebtoken";

export const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    emailId: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: String, default: "" },
    gender: { type: String, default: "" },
    otp: { type: String, default: "" },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "user" }
);

userSchema.methods.getAccessToken = function () {
  const token = jwt.sign({ uid: this._id }, config.get("jwtPrivateKey"));
  return encrypt(token);
};
