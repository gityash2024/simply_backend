import config from "config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decrypt } from "../helper/encription";
import { Customer } from "../services/customer/auth/_validation";
import { User } from "../services/admin/auth/_validation";

export const customerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = req.headers["x-auth-token"] as string;
    if (!token)
      return res.status(401).json({ message: "Authentication failed!" });

    token = await decrypt(token);

    const decodedToken: any = jwt.verify(token, config.get("jwtPrivateKey"));

    let _id: string = decodedToken.cid ? decodedToken.cid : null;
    let customer: any = await Customer.findOne({ _id: _id });
    if (!customer) return res.status(401).json({ message: "No User Found!" });
    req.body.cid = _id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed!" });
  }
};

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = req.headers["x-auth-token"] as string;
    if (!token)
      return res.status(401).json({ message: "Authentication failed!" });

    token = await decrypt(token);

    const decodedToken: any = jwt.verify(token, config.get("jwtPrivateKey"));

    let _id: string = decodedToken.uid ? decodedToken.uid : null;
    let user: any = await User.findOne({ _id: _id });
    if (!user) return res.status(401).json({ message: "No User Found!" });
    req.body.uid = _id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed!" });
  }
};
