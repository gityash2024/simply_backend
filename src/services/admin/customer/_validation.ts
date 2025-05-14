import { model } from "mongoose";
// import Joi from "joi";
import { customerSchema } from "../../../models/customer";

export const Customer = model("Customer", customerSchema);
