import { Request, Response } from "express";
import {
  State,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const stateView = async (state: any) => {
  state = _.pick(state, ["code", "state"]);
  return state;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await State.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.state = await State.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let stateRecord: number = result.state.length;
  result.lastPage = stateRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let state: any = new State(_.pick(req.body, ["code", "state"]));

  state.createdAt = new Date().toISOString();
  state.updatedAt = new Date().toISOString();
  state = await state.save();

  res.status(200).json({ message: "State added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let state: any = await State.findOne({
    _id: req.body.id,
  });
  if (!state) return res.status(404).json({ message: "No record found." });

  state = _.assign(state, _.pick(req.body, ["code", "state"]));

  state.author = req.body.uid;
  state.updatedAt = new Date().toISOString();
  state = await state.save();
  state = await stateView(state);

  res.status(200).json({ message: "State updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let state = await State.findOne({
    _id: req.body.id,
  });
  if (!state) return res.status(400).json({ message: "No Data Found!" });

  await State.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "State deleted successfully." });
};
