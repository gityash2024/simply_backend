import { model } from "mongoose";
import { occupationCodeSchema } from "../../../models/occupationCode";

export const OccupationCode = model("OccupationCode", occupationCodeSchema);
