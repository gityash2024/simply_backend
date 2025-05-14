import { model } from "mongoose";
import Joi from "joi";
import { customerSchema } from "../../../models/customer";

export const Customer = model("Customer", customerSchema);

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    primaryHolderFirstname: Joi.string()
      .required()
      .label("Primary holdar First Name"),
    primaryHolderMiddlename: Joi.string()
      .required()
      .label("Primary holder middle name"),
    primaryHolderLastname: Joi.string()
      .required()
      .label("Primary holder last name"),
    primaryHolderDob: Joi.string().required().label("Primary holder Dob"),
    gender: Joi.string().required().label(" Gender"),
    email: Joi.string().email().required().label("Email"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdateUserId = (data: any) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("User Id"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdateDocuments = (data: any) => {
  const schema = Joi.object({
    phPanExempt: Joi.string().required().label("Primary holder pan exempt"),
    phPan: Joi.string().required().label("Primary holder Pan Number"),
    phExemptCategory: Joi.string()
      .required()
      .label("Primary holder exempt category"),
    clientType: Joi.string().required().label("Cilent type"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdateBankDetails = (data: any) => {
  const schema = Joi.object({
    a1AccountType: Joi.string().required().label("Account 1 account type"),
    a1AccountNo: Joi.string().required().label("Account 1 account Number"),
    a1MicrNo: Joi.string().required().label("Account 1 MICR no"),
    a1IfscCode: Joi.string().required().label("Account 1 IFSC Code"),
    a1DefaultBankFlag: Joi.string()
      .required()
      .label("Account 1 default bank flag"),
    chequeName: Joi.string().required().label("Account 1 cheque name"),
    divPayMode: Joi.string().required().label("Account 1 div pay mode"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateUpdateNomineeDetails = (data: any) => {
  const schema = Joi.object({
    n1Name: Joi.string().required().label("Nominee Name"),
    n1Relationship: Joi.string().required().label("Nominee relationship"),
    n1Applicable: Joi.number().required().label("Nominee applicable"),
    n1MinorFlag: Joi.string().required().label("Nominee minor flag"),
    n1Dob: Joi.string().required().label("Nominee Date of birth"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateIndianAddressDetails = (data: any) => {
  const schema = Joi.object({
    address1: Joi.string().required().label("Address"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("state"),
    pincode: Joi.string().required().label("Pincode"),
    country: Joi.string().required().label("Country"),
    communicationMode: Joi.string().required().label("Communication mode"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export const validateKycDetailsUpdate = (data: any) => {
  const schema = Joi.object({
    phKycType: Joi.string().required().label("Primary holder kyc type"),
    phCkycNumber: Joi.string().required().label("Primary holder Ckyc number"),
    phKraExemptRefNo: Joi.string()
      .required()
      .label("Primary holder Kra exempt ref no"),
    aadhaarUpdated: Joi.string().required().label("Aadhaar Updated"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
