import { model } from "mongoose";
import { stateSchema } from "../../../models/state";

export const State = model("State", stateSchema);
