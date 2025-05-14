import { Schema } from "mongoose";

export const occupationCodeSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    code: { type: String, default: "" },
    details: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "occupationCode" }
);
