import { Request, Response } from "express";
import { Customer } from "./_validation";

export const list = async (req: Request, res: Response) => {
  let pageNo: number = req.body.pageNo ? req.body.pageNo : 1;
  let recordPerPage: number = 100;

  let skip: any = (pageNo - 1) * recordPerPage;
  let limit: any = recordPerPage;

  let filter: any = new Object();
  if (req.body.firstName) {
    filter["firstName"] = req.body.firstName;
  }
  if (req.body.lastname) {
    filter["lastname"] = req.body.lastname;
  }
  if (req.body.emailId) {
    filter["emailId"] = req.body.emailId;
  }

  let result: any = {};
  if (pageNo === 1) {
    let totalRecords: number = await Customer.find().countDocuments();
    result.totalRecords = totalRecords;
  }
  result.customer = await Customer.find({ $and: [filter] })
    .select({ password: 0, otp: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  let customerRecord: number = result.customer.length;
  result.lastPage = customerRecord <= recordPerPage ? true : false;

  res.status(200).json({ data: result });
};
