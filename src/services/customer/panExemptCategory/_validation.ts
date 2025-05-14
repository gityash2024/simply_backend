import { model } from "mongoose";
import { panExemptCategorySchema } from "../../../models/panExemptCategory";

export const PanExemptCategory = model(
  "PanExemptCategory",
  panExemptCategorySchema
);
