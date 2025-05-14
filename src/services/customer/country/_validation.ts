import { model } from "mongoose";
import { countrySchema } from "../../../models/country";

export const Country = model("Country", countrySchema);
