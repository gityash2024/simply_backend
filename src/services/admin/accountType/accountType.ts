import { Request, Response } from "express";
import {
  AccountType,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const accountTypeView = async (account: any) => {
  account = _.pick(account, ["accountCode", "description"]);
  return account;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await AccountType.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.accountType = await AccountType.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let accountTypeRecord: number = result.accountType.length;
  result.lastPage = accountTypeRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let accountTypes: any = await AccountType.findOne({
    accountCode: req.body.accountCode,
  });
  if (accountTypes)
    return res.status(400).json({ message: "Account code already exist." });

  let newAccountType: any = new AccountType(
    _.pick(req.body, ["accountCode", "description"])
  );

  newAccountType.createdAt = new Date().toISOString();
  newAccountType.updatedAt = new Date().toISOString();
  newAccountType = await newAccountType.save();

  res.status(200).json({ message: "Account type added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let accountTypes: any = await AccountType.findOne({ _id: req.body.id });
  if (!accountTypes)
    return res.status(404).json({ message: "No record found." });

  accountTypes = _.assign(
    accountTypes,
    _.pick(req.body, ["accountCode", "description"])
  );

  accountTypes.author = req.body.uid;
  accountTypes.updatedAt = new Date().toISOString();
  accountTypes = await accountTypes.save();
  accountTypes = await accountTypeView(accountTypes);

  res.status(200).json({ message: "Account type updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let accountType = await AccountType.findOne({
    _id: req.body.id,
  });
  if (!accountType) return res.status(400).json({ message: "No Data Found!" });

  await AccountType.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Account type deleted successfully." });
};
