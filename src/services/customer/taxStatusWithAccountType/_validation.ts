import { model } from "mongoose";
import { taxStatusWithAccountTypeSchema } from "../../../models/taxStatusWithAccountType";

export const TaxStatusWithAccountType = model(
  "TaxStatusWithAccountType",
  taxStatusWithAccountTypeSchema
);
