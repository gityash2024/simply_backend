import { Request, Response } from "express";
import { DividendPaymode } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const dividendPaymode = await DividendPaymode.find()
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json({ success: true, data: dividendPaymode });
};
