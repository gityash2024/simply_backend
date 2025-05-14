import { Schema } from "mongoose";

export const dividendPaymodeSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    code: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "dividendPaymode" }
);
