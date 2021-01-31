import type { NextFunction, Request, Response } from "express";
import User from "../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../../../middleware/auth.middleware";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  let errors = [];
  if (!email) {
    errors.push({ param: "email", msg: "Email is required" });
  }
  if (!password) {
    errors.push({ param: "password", msg: "Password is required" });
  }
  if (password?.length < 6) {
    errors.push({ param: "password", msg: "Password should be 6+ characters" });
  }

  if (errors.length) {
    return res.json({
      errors,
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        errors: [
          {
            msg: "User not found",
            param: "email",
          },
        ],
      });
    }

    //   @ts-ignore
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Wrong password", param: "password" }] });
    }

    user = await User.findById(user.id).select("-password");
    // @ts-ignore
    let token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET, {
      expiresIn: `48h`,
    });
    res.cookie("__postly", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 1000 * 24,
    });
    res.status(200).json({ user });
  } catch (error) {
    return res.json({
      errors: [
        {
          message: error.message,
          param: "server",
        },
      ],
    });
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  try {
    if (authMiddleware(req, res, next)) {
      // @ts-ignore
      let user = await User.findById(req.userId).select("-password");

      if (!user) {
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
