import { model } from "mongoose";
import { accountTypeSchema } from "../../../models/accountType";

export const AccountType = model("AccountType", accountTypeSchema);
