import { Request, Response } from "express";
import {
  OccupationCode,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const occupationCodeView = async (occupation: any) => {
  occupation = _.pick(occupation, ["code", "details"]);
  return occupation;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await OccupationCode.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.occupationCode = await OccupationCode.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let occupationCodeRecord: number = result.occupationCode.length;
  result.lastPage = occupationCodeRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let occupationCode: any = new OccupationCode(
    _.pick(req.body, ["code", "details"])
  );

  occupationCode.createdAt = new Date().toISOString();
  occupationCode.updatedAt = new Date().toISOString();
  occupationCode = await occupationCode.save();

  res.status(200).json({ message: "Occupation code added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let occupationCode: any = await OccupationCode.findOne({
    _id: req.body.id,
  });
  if (!occupationCode)
    return res.status(404).json({ message: "No record found." });

  occupationCode = _.assign(
    occupationCode,
    _.pick(req.body, ["code", "details"])
  );

  occupationCode.author = req.body.uid;
  occupationCode.updatedAt = new Date().toISOString();
  occupationCode = await occupationCode.save();
  occupationCode = await occupationCodeView(occupationCode);

  res.status(200).json({ message: "Occupation code updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let occupationCode = await OccupationCode.findOne({
    _id: req.body.id,
  });
  if (!occupationCode)
    return res.status(400).json({ message: "No Data Found!" });

  await OccupationCode.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Occupation code deleted successfully." });
};
