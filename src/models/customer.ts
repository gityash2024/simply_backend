import { Schema } from "mongoose";
import config from "config";
import { encrypt } from "../helper/encription";
import jwt from "jsonwebtoken";

export const customerSchema = new Schema(
  {
    clientCode: { type: String, default: "" },
    primaryHolderFirstname: { type: String, default: "" },
    primaryHolderMiddlename: { type: String, default: "" },
    primaryHolderLastname: { type: String, default: "" },
    primaryHolderDob: { type: Date, default: null },
    secondHolderFirstname: { type: String, default: "" },
    secondHolderMiddlename: { type: String, default: "" },
    secondHolderLastname: { type: String, default: "" },
    secondHolderDob: { type: Date, default: null },
    thirdHoldersFirstname: { type: String, default: "" },
    thirdHoldersMiddlename: { type: String, default: "" },
    thirdHoldersLastname: { type: String, default: "" },
    thirdHoldersDob: { type: Date, default: null },
    taxStatus: { type: Schema.Types.ObjectId, ref: "TaxStatus", default: null },
    gender: {
      type: String,
      default: "",
    }, // M - Male, F - Female, O - Other
    occupationCode: {
      type: Schema.Types.ObjectId,
      ref: "OccupationCode",
      default: null,
    },
    holdingNature: {
      type: Schema.Types.ObjectId,
      ref: "ClientHolding",
      default: null,
    },
    gardianFirstName: { type: String, default: "" },
    gardianMiddleName: { type: String, default: "" },
    gardianLastName: { type: String, default: "" },
    gardianDob: { type: Date, default: null },
    phPanExempt: {
      type: String,
      default: "",
    }, // Y - yes and N - No
    shPanExempt: {
      type: String,
      default: "",
    }, // Y - yes and N - No
    thPanExempt: {
      type: String,
      default: "",
    }, // Y - yes and N - No
    gardianPanExempt: {
      type: String,
      default: "",
    }, // Y - yes and N - No
    phPan: { type: String, default: "" },
    shPan: { type: String, default: "" },
    thPan: { type: String, default: "" },
    gardianPan: { type: String, default: "" },
    phExemptCategory: {
      type: Schema.Types.ObjectId,
      ref: "PanExmptCategory",
      default: null,
    },
    shExemptCategory: {
      type: Schema.Types.ObjectId,
      ref: "PanExmptCategory",
      default: null,
    },
    thExemptCategory: {
      type: Schema.Types.ObjectId,
      ref: "PanExmptCategory",
      default: null,
    },
    gardianExemptCategory: {
      type: Schema.Types.ObjectId,
      ref: "PanExmptCategory",
      default: null,
    },
    clientType: {
      type: String,
      default: "",
    }, // P - physical and D - demat
    pms: { type: String, default: "" }, // Y - yes and N - No
    defaultDp: { type: String, default: "" },
    cdslDpId: { type: String, default: "" },
    cdslCltId: { type: String, default: "" },
    cmBpId: { type: Number, default: "" },
    nsdlDpId: { type: String, default: "" },
    nsdlCltId: { type: String, default: "" },
    a1AccountType: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      default: null,
    },
    a1AccountNo: { type: String, default: "" },
    a1MicrNo: { type: String, default: "" },
    a1IfscCode: { type: String, default: "" },
    a1DefaultBankFlag: { type: String, default: "" },
    a2AccountType: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      default: null,
    },
    a2AccountNo: { type: String, default: "" },
    a2MicrNo: { type: String, default: "" },
    a2IfscCode: { type: String, default: "" },
    a2DefaultBankFlag: { type: String, default: "" },
    a3AccountType: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      default: null,
    },
    a3AccountNo: { type: String, default: "" },
    a3MicrNo: { type: String, default: "" },
    a3IfscCode: { type: String, default: "" },
    a3DefaultBankFlag: { type: String, default: "" },
    chequeName: { type: String, default: "" },
    divPayMode: {
      type: Schema.Types.ObjectId,
      ref: "DividendPaymode",
      default: null,
    },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    address3: { type: String, default: "" },
    city: { type: String, default: "" },
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      default: null,
    },
    pincode: { type: String, default: "" },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      default: null,
    },
    residentialPhone: { type: String, default: "" },
    residentialFax: { type: String, default: "" },
    officePhone: { type: String, default: "" },
    officeFax: { type: String, default: "" },
    email: { type: String, default: "" },
    communicationMode: {
      type: Schema.Types.ObjectId,
      ref: "CommunicationMode",
      default: null,
    }, // P-Physical/E-Email/M-Mobile
    foreignAddress1: { type: String, default: "" },
    foreignAddress2: { type: String, default: "" },
    foreignCity: { type: String, default: "" },
    foreignState: { type: String, default: "" },
    foreignPincode: { type: String, default: "" },
    foreignCountry: { type: String, default: "" },
    foreignResidentialPhone: { type: String, default: "" },
    foreignResidentialFax: { type: String, default: "" },
    foreignOfficePhone: { type: String, default: "" },
    foreignOfficeFax: { type: String, default: "" },
    inMobileNumber: {
      type: String,
      default: "",
    },
    n1Name: { type: String, default: "" },
    n1Relationship: { type: String, default: "" },
    n1Applicable: { type: Number, default: "" },
    n1MinorFlag: { type: String, default: "" },
    n1Dob: { type: Date, default: null },
    n1Gardian: { type: String, default: "" },
    n2Name: { type: String, default: "" },
    n2Relationship: { type: String, default: "" },
    n2Applicable: { type: Number, default: "" },
    n2MinorFlag: { type: String, default: "" },
    n2Dob: { type: Date, default: null },
    n2Gardian: { type: String, default: "" },
    phKycType: {
      type: String,
      default: "",
    }, // K-KRA Compliant, C-CKYC Compliant, B-BIOMETRIC KYC, E-Aadhaar Ekyc PAN
    phCkycNumber: { type: String, default: "" },
    shKycType: {
      type: String,
      default: "",
    }, // K-KRA Compliant, C-CKYC Compliant, B-BIOMETRIC KYC, E-Aadhaar Ekyc PAN
    shCkycNumber: { type: String, default: "" },
    thKycType: {
      type: String,
      default: "",
    }, // K-KRA Compliant, C-CKYC Compliant, B-BIOMETRIC KYC, E-Aadhaar Ekyc PAN
    thCkycNumber: { type: String, default: "" },
    gardianKycType: {
      type: String,
      default: "",
    }, // K-KRA Compliant, C-CKYC Compliant, B-BIOMETRIC KYC, E-Aadhaar Ekyc PAN
    gardianCkycNumber: { type: Number, default: "" },
    phKraExemptRefNo: { type: String, default: "" },
    shKraExemptRefNo: { type: String, default: "" },
    thKraExemptRefNo: { type: String, default: "" },
    gardianExemptRefNo: { type: String, default: "" },
    aadhaarUpdated: { type: String, default: "" }, // Y - yes and N - No
    mapinId: { type: String, default: "" },
    paperlessFlag: {
      type: String,
      default: "",
    }, //P-Paper/ Z-paperless
    leiNo: { type: String, default: "" },
    leiValidity: { type: Date, default: null },
    mobileDeclarationFlag: { type: String, default: "" },
    emailDeclarationFlag: { type: String, default: "" },
    otp: { type: Number, default: "" },
    kyc: { type: String, default: "" },
    userId: { type: String, default: "" },
    password: { type: String, default: "" },
    step: { type: Number, default: 0 },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { collection: "customer" }
);

customerSchema.methods.getAccessToken = function () {
  const token = jwt.sign({ cid: this._id }, config.get("jwtPrivateKey"));
  return encrypt(token);
};
