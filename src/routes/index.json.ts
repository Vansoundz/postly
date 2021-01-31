import authMiddleware from "../middleware/auth.middleware";
import type { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (authMiddleware(req, res, next)) {
      // @ts-ignore
      let user = await User.findById(req.userId).select("-password");

      if (!user) {
        return res.status(200).json({
          errors: [
            {
              msg: "User not found",
              param: "email",
            },
          ],
        });
      }

      res.status(200).json({ user });
    } else
      res.status(401).json({
        errors: [
          {
            msg: "Unauthorized",
            param: "server",
          },
        ],
      });
  } catch (error) {
    return res.json({
      errors: [
        {
          msg: error.message,
          param: "server",
        },
      ],
    });
  }
};
