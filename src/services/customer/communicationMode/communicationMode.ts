import { Request, Response } from "express";
import { CommunicationMode } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const communicationMode = await CommunicationMode.find()
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json({ success: true, data: communicationMode });
};
