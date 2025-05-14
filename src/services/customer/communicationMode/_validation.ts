import { model } from "mongoose";
import { communicationModeSchema } from "../../../models/communicationMode";

export const CommunicationMode = model(
  "CommunicationMode",
  communicationModeSchema
);
