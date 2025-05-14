import { model } from "mongoose";
import { clientHoldingSchema } from "../../../models/clientHolding";

export const ClientHolding = model("ClientHolding", clientHoldingSchema);
