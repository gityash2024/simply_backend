import { Request, Response } from "express";
import { OccupationCode } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const occupationCode = await OccupationCode.find()
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json({ success: true, data: occupationCode });
};
