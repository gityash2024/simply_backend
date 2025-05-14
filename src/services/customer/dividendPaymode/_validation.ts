import { model } from "mongoose";
import { dividendPaymodeSchema } from "../../../models/dividendPaymode";

export const DividendPaymode = model("DividendPaymode", dividendPaymodeSchema);
