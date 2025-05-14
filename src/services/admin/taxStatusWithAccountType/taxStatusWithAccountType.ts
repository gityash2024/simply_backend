import { Request, Response } from "express";
import {
  TaxStatusWithAccountType,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const taxStatusWithAccountTypeView = async (taxStatusWithAccountType: any) => {
  taxStatusWithAccountType = _.pick(taxStatusWithAccountType, [
    "taxCode",
    "taxName",
    "accountType",
  ]);
  return taxStatusWithAccountType;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number =
      await TaxStatusWithAccountType.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.taxStatusWithAccountType = await TaxStatusWithAccountType.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let taxStatusWithAccountTypeRecord: number =
    result.taxStatusWithAccountType.length;
  result.lastPage =
    taxStatusWithAccountTypeRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let taxStatusWithAccountTypes: any = new TaxStatusWithAccountType(
    _.pick(req.body, ["taxCode", "taxName", "accountType"])
  );

  taxStatusWithAccountTypes.createdAt = new Date().toISOString();
  taxStatusWithAccountTypes.updatedAt = new Date().toISOString();
  taxStatusWithAccountTypes = await taxStatusWithAccountTypes.save();

  res
    .status(200)
    .json({ message: "Tax status with account type added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let taxStatusWithAccountTypes: any = await TaxStatusWithAccountType.findOne({
    _id: req.body.id,
  });
  if (!taxStatusWithAccountTypes)
    return res.status(404).json({ message: "No record found." });

  taxStatusWithAccountTypes = _.assign(
    taxStatusWithAccountTypes,
    _.pick(req.body, ["taxCode", "taxName", "accountType"])
  );

  taxStatusWithAccountTypes.author = req.body.uid;
  taxStatusWithAccountTypes.updatedAt = new Date().toISOString();
  taxStatusWithAccountTypes = await taxStatusWithAccountTypes.save();
  taxStatusWithAccountTypes = await taxStatusWithAccountTypeView(
    taxStatusWithAccountTypes
  );

  res
    .status(200)
    .json({ message: "Tax status with account type updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let taxStatusWithAccountTypes = await TaxStatusWithAccountType.findOne({
    _id: req.body.id,
  });
  if (!taxStatusWithAccountTypes)
    return res.status(400).json({ message: "No Data Found!" });

  await TaxStatusWithAccountType.deleteOne({ _id: req.body.id });

  res
    .status(200)
    .json({ message: "Tax status with account type deleted successfully." });
};
