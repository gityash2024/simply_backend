import { Request, Response } from "express";
import {
  TaxStatus,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const taxStatusView = async (taxStatus: any) => {
  taxStatus = _.pick(taxStatus, ["taxCode", "taxName"]);
  return taxStatus;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await TaxStatus.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.taxStatus = await TaxStatus.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let taxStatusRecord: number = result.taxStatus.length;
  result.lastPage = taxStatusRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let taxStatus: any = new TaxStatus(_.pick(req.body, ["taxCode", "taxName"]));

  taxStatus.createdAt = new Date().toISOString();
  taxStatus.updatedAt = new Date().toISOString();
  taxStatus = await taxStatus.save();

  res.status(200).json({ message: "Tax status added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let taxStatus: any = await TaxStatus.findOne({
    _id: req.body.id,
  });
  if (!taxStatus) return res.status(404).json({ message: "No record found." });

  taxStatus = _.assign(taxStatus, _.pick(req.body, ["taxCode", "taxName"]));

  taxStatus.author = req.body.uid;
  taxStatus.updatedAt = new Date().toISOString();
  taxStatus = await taxStatus.save();
  taxStatus = await taxStatusView(taxStatus);

  res.status(200).json({ message: "Tax status updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let taxStatus = await TaxStatus.findOne({
    _id: req.body.id,
  });
  if (!taxStatus) return res.status(400).json({ message: "No Data Found!" });

  await TaxStatus.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Tax status deleted successfully." });
};
