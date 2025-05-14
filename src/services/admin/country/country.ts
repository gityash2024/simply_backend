import { Request, Response } from "express";
import {
  Country,
  validateAdd,
  validateDelete,
  validateUpdate,
} from "./_validation";
import _ from "lodash";

const countryView = async (country: any) => {
  country = _.pick(country, ["code", "name"]);
  return country;
};

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await Country.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.country = await Country.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let countryRecord: number = result.country.length;
  result.lastPage = countryRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};

export const add = async (req: Request, res: Response) => {
  const { error } = validateAdd(req.body);
  if (error) throw error;

  let country: any = new Country(_.pick(req.body, ["code", "name"]));

  country.createdAt = new Date().toISOString();
  country.updatedAt = new Date().toISOString();
  country = await country.save();

  res.status(200).json({ message: "Country added successfully." });
};

export const update = async (req: Request, res: Response) => {
  const { error } = validateUpdate(req.body);
  if (error) throw error;

  let country: any = await Country.findOne({
    _id: req.body.id,
  });
  if (!country) return res.status(404).json({ message: "No record found." });

  country = _.assign(country, _.pick(req.body, ["code", "name"]));

  country.author = req.body.uid;
  country.updatedAt = new Date().toISOString();
  country = await country.save();
  country = await countryView(country);

  res.status(200).json({ message: "Country updated successfully." });
};

export const remove = async (req: Request, res: Response) => {
  const { error } = validateDelete(req.body);
  if (error) throw error;

  let country = await Country.findOne({
    _id: req.body.id,
  });
  if (!country) return res.status(400).json({ message: "No Data Found!" });

  await Country.deleteOne({ _id: req.body.id });

  res.status(200).json({ message: "Country deleted successfully." });
};
