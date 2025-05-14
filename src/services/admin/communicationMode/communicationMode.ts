import { Request, Response } from "express";
import {
  CommunicationMode,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const communicationModeView = async (cMode: any) => {
  cMode = _.pick(cMode, ["code", "details"]);
  return cMode;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await CommunicationMode.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.communicationMode = await CommunicationMode.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let communicationModeRecord: number = result.communicationMode.length;
  result.lastPage = communicationModeRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let communicationMode: any = new CommunicationMode(
    _.pick(req.body, ["code", "details"])
  );

  communicationMode.createdAt = new Date().toISOString();
  communicationMode.updatedAt = new Date().toISOString();
  communicationMode = await communicationMode.save();

  res.status(200).json({ message: "Communication mode added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let communicationMode: any = await CommunicationMode.findOne({
    _id: req.body.id,
  });
  if (!communicationMode)
    return res.status(404).json({ message: "No record found." });

  communicationMode = _.assign(
    communicationMode,
    _.pick(req.body, ["code", "details"])
  );

  communicationMode.author = req.body.uid;
  communicationMode.updatedAt = new Date().toISOString();
  communicationMode = await communicationMode.save();
  communicationMode = await communicationModeView(communicationMode);

  res.status(200).json({ message: "Communication mode updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let communicationMode = await CommunicationMode.findOne({
    _id: req.body.id,
  });
  if (!communicationMode)
    return res.status(400).json({ message: "No Data Found!" });

  await CommunicationMode.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Communication mode deleted successfully." });
};
