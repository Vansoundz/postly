import { config } from "dotenv";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

config();

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.__postly;

    if (!token) return false;

    // @ts-ignore
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    // @ts-ignore
    if (!decoded.userId) return false;

    // @ts-ignore
    req.userId = decoded.userId;
    return true;
  } catch (error) {
    return false;
  }
};

export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    // let token = req.headers.authorization;
    let token = req.cookies.__postly;

    if (token) {
      // @ts-ignore
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      // @ts-ignore
      if (decoded.userId)
        // @ts-ignore
        req.userId = decoded.userId;
    }

    next();
  } catch (error) {
    next();
  }
};
