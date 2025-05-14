import { model } from "mongoose";
import { taxStatusSchema } from "../../../models/taxStatus";

export const TaxStatus = model("TaxStatus", taxStatusSchema);
