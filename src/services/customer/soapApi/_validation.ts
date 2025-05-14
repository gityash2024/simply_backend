import { model } from "mongoose";
import { customerSchema } from "../../../models/customer";

export const Customer = model("Customer", customerSchema);
