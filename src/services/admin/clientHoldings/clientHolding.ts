import { Request, Response } from "express";
import {
  ClientHolding,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const clientHoldingView = async (cHolding: any) => {
  cHolding = _.pick(cHolding, ["code", "details"]);
  return cHolding;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await ClientHolding.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.clientHolding = await ClientHolding.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let clientHoldingRecord: number = result.clientHolding.length;
  result.lastPage = clientHoldingRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let clientHolding: any = new ClientHolding(
    _.pick(req.body, ["code", "details"])
  );

  clientHolding.createdAt = new Date().toISOString();
  clientHolding.updatedAt = new Date().toISOString();
  clientHolding = await clientHolding.save();

  res.status(200).json({ message: "Client holding added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let clientHolding: any = await ClientHolding.findOne({
    _id: req.body.id,
  });
  if (!clientHolding)
    return res.status(404).json({ message: "No record found." });

  clientHolding = _.assign(
    clientHolding,
    _.pick(req.body, ["code", "details"])
  );

  clientHolding.author = req.body.uid;
  clientHolding.updatedAt = new Date().toISOString();
  clientHolding = await clientHolding.save();
  clientHolding = await clientHoldingView(clientHolding);

  res.status(200).json({ message: "Client Holding updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let clientHolding = await ClientHolding.findOne({
    _id: req.body.id,
  });
  if (!clientHolding)
    return res.status(400).json({ message: "No Data Found!" });

  await ClientHolding.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Client holding deleted successfully." });
};
