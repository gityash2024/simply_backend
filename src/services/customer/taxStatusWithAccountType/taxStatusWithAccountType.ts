import { Request, Response } from "express";
import { TaxStatusWithAccountType } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const taxStatusWithAccountType = await TaxStatusWithAccountType.find()
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json({ success: true, data: taxStatusWithAccountType });
};
