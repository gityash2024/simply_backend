import { Schema } from "mongoose";

export const stateSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    code: { type: String, default: "" },
    state: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "state" }
);
