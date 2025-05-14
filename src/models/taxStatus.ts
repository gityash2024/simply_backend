import { Schema } from "mongoose";

export const taxStatusSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    taxCode: { type: String, default: "" },
    taxName: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "taxStatus" }
);
