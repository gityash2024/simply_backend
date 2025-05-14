import { model } from "mongoose";
import { customerSchema } from "../models/customer";
import { userSchema } from "../models/user";
import { accountTypeSchema } from "../models/accountType";
import { taxStatusWithAccountTypeSchema } from "../models/taxStatusWithAccountType";
import { taxStatusSchema } from "../models/taxStatus";
import { clientHoldingSchema } from "../models/clientHolding";
import { dividendPaymodeSchema } from "../models/dividendPaymode";
import { communicationModeSchema } from "../models/communicationMode";
import { occupationCodeSchema } from "../models/occupationCode";
import { countrySchema } from "../models/country";
import { stateSchema } from "../models/state";
import { panExemptCategorySchema } from "../models/panExemptCategory";

export default () => {
  model("Customer", customerSchema);
  model("User", userSchema);
  model("AccountType", accountTypeSchema);
  model("TaxStatusWithAccountType", taxStatusWithAccountTypeSchema);
  model("TaxStatus", taxStatusSchema);
  model("ClientHolding", clientHoldingSchema);
  model("DividendPaymode", dividendPaymodeSchema);
  model("CommunicationMode", communicationModeSchema);
  model("OccupationCode", occupationCodeSchema);
  model("Country", countrySchema);
  model("State", stateSchema);
  model("PanExmptCategory", panExemptCategorySchema);
};
