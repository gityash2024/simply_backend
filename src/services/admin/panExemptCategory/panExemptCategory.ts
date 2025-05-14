import { Request, Response } from "express";
import {
  PanExemptCategory,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const panExemptCategoryView = async (category: any) => {
  category = _.pick(category, ["category", "description"]);
  return category;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await PanExemptCategory.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.panExemptCategory = await PanExemptCategory.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let panExemptCategoryRecord: number = result.panExemptCategory.length;
  result.lastPage = panExemptCategoryRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let panExemptCategory: any = new PanExemptCategory(
    _.pick(req.body, ["category", "description"])
  );

  panExemptCategory.createdAt = new Date().toISOString();
  panExemptCategory.updatedAt = new Date().toISOString();
  panExemptCategory = await panExemptCategory.save();

  res.status(200).json({ message: "Pan exempt category added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let panExemptCategory: any = await PanExemptCategory.findOne({
    _id: req.body.id,
  });
  if (!panExemptCategory)
    return res.status(404).json({ message: "No record found." });

  panExemptCategory = _.assign(
    panExemptCategory,
    _.pick(req.body, ["category", "description"])
  );

  panExemptCategory.author = req.body.uid;
  panExemptCategory.updatedAt = new Date().toISOString();
  panExemptCategory = await panExemptCategory.save();
  panExemptCategory = await panExemptCategoryView(panExemptCategory);

  res
    .status(200)
    .json({ message: "Pan exempt category updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let panExemptCategory = await PanExemptCategory.findOne({
    _id: req.body.id,
  });
  if (!panExemptCategory)
    return res.status(400).json({ message: "No Data Found!" });

  await PanExemptCategory.deleteOne({ _id: req.body.id });

  res
    .status(200)
    .json({ message: "Pan exempt category deleted successfully." });
};
