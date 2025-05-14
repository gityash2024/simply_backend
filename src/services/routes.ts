import express from "express";
import customerLogin from "./customer/auth/_router";
import customerProfileDetails from "./customer/profile/_router";
import customerAccountType from "./customer/accountType/_router";
import customerClientHolding from "./customer/clientHoldings/_router";
import customerCommunicationCode from "./customer/communicationMode/_router";
import customerCountry from "./customer/country/_router";
import customerDividendPaymode from "./customer/dividendPaymode/_router";
import customerOccupationCode from "./customer/occupationCode/_router";
import customerPanExemptCategory from "./customer/panExemptCategory/_router";
import customerState from "./customer/state/_router";
import customerTaxStatus from "./customer/taxStatus/_router";
import customerTaxStatusWithAccountType from "./customer/taxStatusWithAccountType/_router";
import customerSOAPRegister from "./customer/soapApi/_router";

import adminLogin from "./admin/auth/_router";
import userProfileDetails from "./admin/profile/_router";
import customers from "./admin/customer/_router";
import accountType from "./admin/accountType/_router";
import taxStatusWithAccountType from "./admin/taxStatusWithAccountType/_router";
import taxStatus from "./admin/taxStatus/_router";
import clientHolding from "./admin/clientHoldings/_router";
import dividendPaymode from "./admin/dividendPaymode/_router";
import communicationMode from "./admin/communicationMode/_router";
import occupationCode from "./admin/occupationCode/_router";
import panExemptCategory from "./admin/panExemptCategory/_router";
import country from "./admin/country/_router";
import state from "./admin/state/_router";
import { customerAuth, userAuth } from "../middleware/auth";

const app = express();

app.use("/customer", customerLogin);
app.use("/admin", adminLogin);
app.use("/admin/profile", userAuth, userProfileDetails);
app.use("/admin/customer", userAuth, customers);
app.use("/admin/account-type", userAuth, accountType);
app.use(
  "/admin/tax-status-with-account-type",
  userAuth,
  taxStatusWithAccountType
);
app.use("/admin/tax-status", userAuth, taxStatus);
app.use("/admin/client-holding", userAuth, clientHolding);
app.use("/admin/dividend-paymode", userAuth, dividendPaymode);
app.use("/admin/communication-mode", userAuth, communicationMode);
app.use("/admin/occupation-code", userAuth, occupationCode);
app.use("/admin/pan-exempt-category", userAuth, panExemptCategory);
app.use("/admin/country", userAuth, country);
app.use("/admin/state", userAuth, state);

app.use("/customer/profile", customerAuth, customerProfileDetails);
app.use("/customer/account-type", customerAuth, customerAccountType);
app.use("/customer/client-holding", customerAuth, customerClientHolding);
app.use(
  "/customer/communication-mode",
  customerAuth,
  customerCommunicationCode
);
app.use("/customer/country", customerAuth, customerCountry);
app.use("/customer/dividend-paymode", customerAuth, customerDividendPaymode);
app.use("/customer/occupation-code", customerAuth, customerOccupationCode);
app.use(
  "/customer/pan-exempt-category",
  customerAuth,
  customerPanExemptCategory
);
app.use("/customer/state", customerAuth, customerState);
app.use("/customer/tax-status", customerAuth, customerTaxStatus);
app.use(
  "/customer/tax-status-with-account-type",
  customerAuth,
  customerTaxStatusWithAccountType
);
app.use("/customer/soap", customerAuth, customerSOAPRegister);

export default app;
