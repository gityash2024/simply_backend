import { Request, Response } from "express";
import { AccountType } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const accountType = await AccountType.find().sort({ createdAt: 1 }).lean();

  res.status(200).json({ success: true, data: accountType });
};
