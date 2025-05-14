import { Request, Response } from "express";
import { TaxStatus } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const taxStatus = await TaxStatus.find().sort({ createdAt: 1 }).lean();

  res.status(200).json({ success: true, data: taxStatus });
};
