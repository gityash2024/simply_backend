import { Schema } from "mongoose";

export const panExemptCategorySchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "panExemptCategory" }
);
