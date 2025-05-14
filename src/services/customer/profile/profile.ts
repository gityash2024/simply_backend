import { Request, Response } from "express";
import {
  Customer,
  validateIndianAddressDetails,
  validateKycDetailsUpdate,
  validateUpdate,
  validateUpdateBankDetails,
  validateUpdateDocuments,
  validateUpdateNomineeDetails,
  validateUpdateUserId,
} from "./_validation";
import _ from "lodash";
import { encrypt } from "../../../helper/encription";

const customerView = async (customer: any) => {
  customer = _.pick(customer, [
    "clientCode",
    "primaryHolderFirstname",
    "primaryHolderMiddlename",
    "primaryHolderLastname",
    "primaryHolderDob",
    "secondHolderFirstname",
    "secondHolderMiddlename",
    "secondHolderLastname",
    "secondHolderDob",
    "thirdHoldersFirstname",
    "thirdHoldersMiddlename",
    "thirdHoldersLastname",
    "thirdHoldersDob",
    "taxStatus",
    "gender",
    "occupationCode",
    "holdingNature",
    "gardianFirstName",
    "gardianMiddleName",
    "gardianLastName",
    "gardianDob",
    "phPanExempt",
    "shPanExempt",
    "thPanExempt",
    "gardianPanExempt",
    "phPan",
    "shPan",
    "thPan",
    "gardianPan",
    "phExemptCategory",
    "shExemptCategory",
    "thExemptCategory",
    "gardianExemptCategory",
    "clientType",
    "pms",
    "defaultDp",
    "cdslDpId",
    "cdslCltId",
    "cmBpId",
    "nsdlDpId",
    "nsdlCltId",
    "a1AccountType",
    "a1AccountNo",
    "a1MicrNo",
    "a1IfscCode",
    "a1DefaultBankFlag",
    "a2AccountType",
    "a2AccountNo",
    "a2MicrNo",
    "a2IfscCode",
    "a2DefaultBankFlag",
    "a3AccountType",
    "a3AccountNo",
    "a3MicrNo",
    "a3IfscCode",
    "a3DefaultBankFlag",
    "chequeName",
    "divPayMode",
    "address1",
    "address2",
    "address3",
    "city",
    "state",
    "pincode",
    "country",
    "residentialPhone",
    "residentialFax",
    "officePhone",
    "officeFax",
    "email",
    "communicationMode",
    "foreignAddress1",
    "foreignAddress2",
    "foreignCity",
    "foreignState",
    "foreignPincode",
    "foreignCountry",
    "foreignResidentialPhone",
    "foreignResidentialFax",
    "foreignOfficePhone",
    "foreignOfficeFax",
    "inMobileNumber",
    "n1Name",
    "n1Relationship",
    "n1Applicable",
    "n1MinorFlag",
    "n1Dob",
    "n1Gardian",
    "n2Name",
    "n2Relationship",
    "n2Applicable",
    "n2MinorFlag",
    "n2Dob",
    "n2Gardian",
    "phKycType",
    "phCkycNumber",
    "shKycType",
    "shCkycNumber",
    "thKycType",
    "thCkycNumber",
    "gardianKycType",
    "gardianCkycNumber",
    "phKraExemptRefNo",
    "shKraExemptRefNo",
    "thKraExemptRefNo",
    "gardianExemptRefNo",
    "aadhaarUpdated",
    "mapinId",
    "paperlessFlag",
    "leiNo",
    "leiValidity",
    "mobileDeclarationFlag",
    "emailDeclarationFlag",
    "otp",
    "userId",
    "password",
    "createdAt",
    "updatedAt",
  ]);
  return customer;
};

export const view = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    password: 0,
    otp: 0,
  });
  if (!customer)
    return res
      .status(400)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const personalDetailsUpdate = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  let emailId: any = await Customer.findOne({
    email: req.body.email,
  });
  if (emailId)
    return res
      .status(400)
      .json({ success: false, message: "Email Id Already Exist" });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "clientCode",
      "primaryHolderFirstname",
      "primaryHolderMiddlename",
      "primaryHolderLastname",
      "primaryHolderDob",
      "secondHolderFirstname",
      "secondHolderMiddlename",
      "secondHolderLastname",
      "secondHolderDob",
      "thirdHoldersFirstname",
      "thirdHoldersMiddlename",
      "thirdHoldersLastname",
      "thirdHoldersDob",
      "taxStatus",
      "gender",
      "occupationCode",
      "holdingNature",
      "email",
    ])
  );
  customer.password = encrypt(req.body.password);
  customer.step = 1;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();
  customer = await customerView(customer);

  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully." });
};

export const documentDetailsUpdate = async (req: Request, res: Response) => {
  const { error } = validateUpdateDocuments(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "phPanExempt",
      "shPanExempt",
      "thPanExempt",
      "gardianPanExempt",
      "phPan",
      "shPan",
      "thPan",
      "gardianPan",
      "phExemptCategory",
      "shExemptCategory",
      "thExemptCategory",
      "gardianExemptCategory",
      "clientType",
    ])
  );

  customer.step = 2;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Document updated successfully." });
};

export const gardianDetailsUpdate = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "gardianFirstName",
      "gardianMiddleName",
      "gardianLastName",
      "gardianDob",
    ])
  );

  customer.step = 9;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Gardian Details updated successfully." });
};

export const bankDetailsUpdate = async (req: Request, res: Response) => {
  const { error } = validateUpdateBankDetails(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "a1AccountType",
      "a1AccountNo",
      "a1MicrNo",
      "a1IfscCode",
      "a1DefaultBankFlag",
      "a2AccountType",
      "a2AccountNo",
      "a2MicrNo",
      "a2IfscCode",
      "a2DefaultBankFlag",
      "a3AccountType",
      "a3AccountNo",
      "a3MicrNo",
      "a3IfscCode",
      "a3DefaultBankFlag",
      "chequeName",
      "divPayMode",
    ])
  );

  customer.step = 3;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Bank details updated successfully." });
};

export const nomineeDetailsUpdate = async (req: Request, res: Response) => {
  const { error } = validateUpdateNomineeDetails(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "n1Name",
      "n1Relationship",
      "n1Applicable",
      "n1MinorFlag",
      "n1Dob",
      "n1Gardian",
      "n2Name",
      "n2Relationship",
      "n2Applicable",
      "n2MinorFlag",
      "n2Dob",
      "n2Gardian",
    ])
  );

  customer.step = 4;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Nominee detail updated successfully." });
};

export const kycDetailsUpdate = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "phKycType",
      "phCkycNumber",
      "shKycType",
      "shCkycNumber",
      "thKycType",
      "thCkycNumber",
      "gardianKycType",
      "gardianCkycNumber",
      "phKraExemptRefNo",
      "shKraExemptRefNo",
      "thKraExemptRefNo",
      "gardianExemptRefNo",
      "aadhaarUpdated",
    ])
  );

  customer.step = 6;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "KYC detail updated successfully." });
};

export const indianAddressDetailsUpdate = async (
  req: Request,
  res: Response
) => {
  const { error } = validateIndianAddressDetails(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "address1",
      "address2",
      "address3",
      "city",
      "state",
      "pincode",
      "country",
      "residentialPhone",
      "residentialFax",
      "officePhone",
      "officeFax",
      "communicationMode",
    ])
  );

  customer.step = 5;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Address detail updated successfully." });
};

export const foreignAddressDetailsUpdate = async (
  req: Request,
  res: Response
) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "foreignAddress1",
      "foreignAddress2",
      "foreignCity",
      "foreignState",
      "foreignPincode",
      "foreignCountry",
      "foreignResidentialPhone",
      "foreignResidentialFax",
      "foreignOfficePhone",
      "foreignOfficeFax",
    ])
  );

  customer.step = 7;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res.status(200).json({
    success: true,
    message: "Foreign Address detail updated successfully.",
  });
};

export const cdslAndNsdlDetailsUpdate = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "pms",
      "defaultDp",
      "cdslDpId",
      "cdslCltId",
      "cmBpId",
      "nsdlDpId",
      "nsdlCltId",
      "mapinId",
      "leiNo",
      "leiValidity",
      "mobileDeclarationFlag",
      "emailDeclarationFlag",
      "paperlessFlag",
    ])
  );

  customer.step = 8;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res.status(200).json({
    success: true,
    message: "CDSL and NDSL detail updated successfully.",
  });
};

export const userIdUpdate = async (req: Request, res: Response) => {
  const { error } = validateUpdateUserId(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  const customers: any = await Customer.findOne({
    _id: { $ne: req.body.cid },
    userId: req.body.userId,
  });
  if (customers)
    return res.status(400).json({
      success: false,
      message: "User Id is already in use! please entered different.",
    });

  customer = _.assign(customer, _.pick(req.body, ["userId"]));
  customer.step = 10;
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "User Id updated successfully." });
};

export const UpdatePersonalDetails = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  let emailId: any = await Customer.findOne({
    email: req.body.email,
  });
  if (emailId)
    return res
      .status(400)
      .json({ success: false, message: "Email Id Already Exist" });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "clientCode",
      "primaryHolderFirstname",
      "primaryHolderMiddlename",
      "primaryHolderLastname",
      "primaryHolderDob",
      "secondHolderFirstname",
      "secondHolderMiddlename",
      "secondHolderLastname",
      "secondHolderDob",
      "thirdHoldersFirstname",
      "thirdHoldersMiddlename",
      "thirdHoldersLastname",
      "thirdHoldersDob",
      "taxStatus",
      "gender",
      "occupationCode",
      "holdingNature",
      "email",
    ])
  );
  customer.password = encrypt(req.body.password);
  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();
  customer = await customerView(customer);

  res
    .status(200)
    .json({ success: true, message: "Personal Details updated successfully." });
};

export const UpdateDocumentDetails = async (req: Request, res: Response) => {
  const { error } = validateUpdateDocuments(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "phPanExempt",
      "shPanExempt",
      "thPanExempt",
      "gardianPanExempt",
      "phPan",
      "shPan",
      "thPan",
      "gardianPan",
      "phExemptCategory",
      "shExemptCategory",
      "thExemptCategory",
      "gardianExemptCategory",
      "clientType",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Document updated successfully." });
};

export const UpdateBankDetails = async (req: Request, res: Response) => {
  const { error } = validateUpdateBankDetails(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "a1AccountType",
      "a1AccountNo",
      "a1MicrNo",
      "a1IfscCode",
      "a1DefaultBankFlag",
      "a2AccountType",
      "a2AccountNo",
      "a2MicrNo",
      "a2IfscCode",
      "a2DefaultBankFlag",
      "a3AccountType",
      "a3AccountNo",
      "a3MicrNo",
      "a3IfscCode",
      "a3DefaultBankFlag",
      "chequeName",
      "divPayMode",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Bank details updated successfully." });
};

export const UpdateNomineeDetails = async (req: Request, res: Response) => {
  const { error } = validateUpdateNomineeDetails(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "n1Name",
      "n1Relationship",
      "n1Applicable",
      "n1MinorFlag",
      "n1Dob",
      "n1Gardian",
      "n2Name",
      "n2Relationship",
      "n2Applicable",
      "n2MinorFlag",
      "n2Dob",
      "n2Gardian",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Nominee detail updated successfully." });
};

export const UpdateIndianAddressDetails = async (
  req: Request,
  res: Response
) => {
  const { error } = validateIndianAddressDetails(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "address1",
      "address2",
      "address3",
      "city",
      "state",
      "pincode",
      "country",
      "residentialPhone",
      "residentialFax",
      "officePhone",
      "officeFax",
      "communicationMode",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Address detail updated successfully." });
};

export const UpdateKycDetails = async (req: Request, res: Response) => {
  const { error } = validateKycDetailsUpdate(req.body);
  if (error) throw error;

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "phKycType",
      "phCkycNumber",
      "shKycType",
      "shCkycNumber",
      "thKycType",
      "thCkycNumber",
      "gardianKycType",
      "gardianCkycNumber",
      "phKraExemptRefNo",
      "shKraExemptRefNo",
      "thKraExemptRefNo",
      "gardianExemptRefNo",
      "aadhaarUpdated",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "KYC detail updated successfully." });
};

export const UpdateForeignAddressDetails = async (
  req: Request,
  res: Response
) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "foreignAddress1",
      "foreignAddress2",
      "foreignCity",
      "foreignState",
      "foreignPincode",
      "foreignCountry",
      "foreignResidentialPhone",
      "foreignResidentialFax",
      "foreignOfficePhone",
      "foreignOfficeFax",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res.status(200).json({
    success: true,
    message: "Foreign Address detail updated successfully.",
  });
};

export const UpdateCdslAndNsdlDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "pms",
      "defaultDp",
      "cdslDpId",
      "cdslCltId",
      "cmBpId",
      "nsdlDpId",
      "nsdlCltId",
      "mapinId",
      "leiNo",
      "leiValidity",
      "mobileDeclarationFlag",
      "emailDeclarationFlag",
      "paperlessFlag",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res.status(200).json({
    success: true,
    message: "CDSL and NDSL detail updated successfully.",
  });
};

export const UpdateGardianDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  customer = _.assign(
    customer,
    _.pick(req.body, [
      "gardianFirstName",
      "gardianMiddleName",
      "gardianLastName",
      "gardianDob",
    ])
  );

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "Gardian Details updated successfully." });
};

export const UpdateUserId = async (req: Request, res: Response) => {
  const { error } = validateUpdateUserId(req.body);
  if (error) return res.status(400).json({ success: false, data: error });

  let customer: any = await Customer.findOne({ _id: req.body.cid });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  const customers: any = await Customer.findOne({
    _id: { $ne: req.body.cid },
    userId: req.body.userId,
  });
  if (customers)
    return res.status(400).json({
      success: false,
      message: "User Id is already in use! please entered different.",
    });

  customer = _.assign(customer, _.pick(req.body, ["userId"]));

  customer.updatedAt = new Date().toISOString();
  customer = await customer.save();

  res
    .status(200)
    .json({ success: true, message: "User Id updated successfully." });
};

export const viewPersonalDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    clientCode: 1,
    primaryHolderFirstname: 1,
    primaryHolderMiddlename: 1,
    primaryHolderLastname: 1,
    primaryHolderDob: 1,
    secondHolderFirstname: 1,
    secondHolderMiddlename: 1,
    secondHolderLastname: 1,
    secondHolderDob: 1,
    thirdHoldersFirstname: 1,
    thirdHoldersMiddlename: 1,
    thirdHoldersLastname: 1,
    thirdHoldersDob: 1,
    taxStatus: 1,
    gender: 1,
    occupationCode: 1,
    holdingNature: 1,
    email: 1,
  });

  res.status(200).json({ success: true, data: customer });
};

export const viewDocumentDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    phPanExempt: 1,
    shPanExempt: 1,
    thPanExempt: 1,
    gardianPanExempt: 1,
    phPan: 1,
    shPan: 1,
    thPan: 1,
    gardianPan: 1,
    phExemptCategory: 1,
    shExemptCategory: 1,
    thExemptCategory: 1,
    gardianExemptCategory: 1,
    clientType: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const viewBankDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    a1AccountType: 1,
    a1AccountNo: 1,
    a1MicrNo: 1,
    a1IfscCode: 1,
    a1DefaultBankFlag: 1,
    a2AccountType: 1,
    a2AccountNo: 1,
    a2MicrNo: 1,
    a2IfscCode: 1,
    a2DefaultBankFlag: 1,
    a3AccountType: 1,
    a3AccountNo: 1,
    a3MicrNo: 1,
    a3IfscCode: 1,
    a3DefaultBankFlag: 1,
    chequeName: 1,
    divPayMode: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const viewNomineeDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    n1Name: 1,
    n1Relationship: 1,
    n1Applicable: 1,
    n1MinorFlag: 1,
    n1Dob: 1,
    n1Gardian: 1,
    n2Name: 1,
    n2Relationship: 1,
    n2Applicable: 1,
    n2MinorFlag: 1,
    n2Dob: 1,
    n2Gardian: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const ViewIndianAddressDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    address1: 1,
    address2: 1,
    address3: 1,
    city: 1,
    state: 1,
    pincode: 1,
    country: 1,
    residentialPhone: 1,
    residentialFax: 1,
    officePhone: 1,
    officeFax: 1,
    communicationMode: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const viewKycDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    phKycType: 1,
    phCkycNumber: 1,
    shKycType: 1,
    shCkycNumber: 1,
    thKycType: 1,
    thCkycNumber: 1,
    gardianKycType: 1,
    gardianCkycNumber: 1,
    phKraExemptRefNo: 1,
    shKraExemptRefNo: 1,
    thKraExemptRefNo: 1,
    gardianExemptRefNo: 1,
    aadhaarUpdated: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const viewForeignAddressDetails = async (
  req: Request,
  res: Response
) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    foreignAddress1: 1,
    foreignAddress2: 1,
    foreignCity: 1,
    foreignState: 1,
    foreignPincode: 1,
    foreignCountry: 1,
    foreignResidentialPhone: 1,
    foreignResidentialFax: 1,
    foreignOfficePhone: 1,
    foreignOfficeFax: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({
    success: true,
    data: customer,
  });
};

export const viewCdslAndNsdlDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    pms: 1,
    defaultDp: 1,
    cdslDpId: 1,
    cdslCltId: 1,
    cmBpId: 1,
    nsdlDpId: 1,
    nsdlCltId: 1,
    mapinId: 1,
    leiNo: 1,
    leiValidity: 1,
    mobileDeclarationFlag: 1,
    emailDeclarationFlag: 1,
    paperlessFlag: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({
    success: true,
    data: customer,
  });
};

export const viewGardianDetails = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    gardianFirstName: 1,
    gardianMiddleName: 1,
    gardianLastName: 1,
    gardianDob: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};

export const viewUserId = async (req: Request, res: Response) => {
  let customer: any = await Customer.findOne({ _id: req.body.cid }).select({
    userId: 1,
  });
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "No record found." });

  res.status(200).json({ success: true, data: customer });
};
