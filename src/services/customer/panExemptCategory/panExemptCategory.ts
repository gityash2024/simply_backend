import { Request, Response } from "express";
import { PanExemptCategory } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const panExemptCategory = await PanExemptCategory.find()
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json({ success: true, data: panExemptCategory });
};
