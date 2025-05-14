import { Request, Response } from "express";
import { Country } from "./_validation";
export const list = async (req: Request, res: Response) => {
  const country = await Country.find().sort({ createdAt: 1 }).lean();

  res.status(200).json({ success: true, data: country });
};
