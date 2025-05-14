import { Request, Response } from "express";
import { ClientHolding } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const clientHolding = await ClientHolding.find()
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json({ success: true, data: clientHolding });
};
