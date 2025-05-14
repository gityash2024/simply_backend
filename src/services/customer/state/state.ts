import { Request, Response } from "express";
import { State } from "./_validation";

export const list = async (req: Request, res: Response) => {
  const state = await State.find().sort({ createdAt: 1 }).lean();

  res.status(200).json({ success: true, data: state });
};
