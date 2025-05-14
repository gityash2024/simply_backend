import { Request, Response } from "express";
import {
  DividendPaymode,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const dividendPaymodeView = async (dividendPaymode: any) => {
  dividendPaymode = _.pick(dividendPaymode, ["code", "description"]);
  return dividendPaymode;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await DividendPaymode.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.dividendPaymode = await DividendPaymode.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let dividendPaymodeRecord: number = result.dividendPaymode.length;
  result.lastPage = dividendPaymodeRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let dividendPaymode: any = new DividendPaymode(
    _.pick(req.body, ["code", "description"])
  );

  dividendPaymode.createdAt = new Date().toISOString();
  dividendPaymode.updatedAt = new Date().toISOString();
  dividendPaymode = await dividendPaymode.save();

  res.status(200).json({ message: "Dividend paymode added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let dividendPaymode: any = await DividendPaymode.findOne({
    _id: req.body.id,
  });
  if (!dividendPaymode)
    return res.status(404).json({ message: "No record found." });

  dividendPaymode = _.assign(
    dividendPaymode,
    _.pick(req.body, ["code", "description"])
  );

  dividendPaymode.author = req.body.uid;
  dividendPaymode.updatedAt = new Date().toISOString();
  dividendPaymode = await dividendPaymode.save();
  dividendPaymode = await dividendPaymodeView(dividendPaymode);

  res.status(200).json({ message: "Dividend paymode updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let dividendPaymode = await DividendPaymode.findOne({
    _id: req.body.id,
  });
  if (!dividendPaymode)
    return res.status(400).json({ message: "No Data Found!" });

  await DividendPaymode.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Dividend paymode deleted successfully." });
};
