import type { NextFunction, Request, Response } from "express";
import User from "../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password, fullName } = req.body;

  let errors = [];
  if (!fullName) {
    errors.push({ param: "fullName", msg: "Name is required" });
  }
  if (!email) {
    errors.push({ param: "email", msg: "Email is required" });
  }
  if (!password) {
    errors.push({ param: "password", msg: "Password is required" });
  }
  if (password.length < 6) {
    errors.push({ param: "password", msg: "Password should be 6+ characters" });
  }

  if (errors.length) {
    return res.json({
      errors,
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        errors: [
          {
            msg: "Email is taken",
            param: "email",
          },
        ],
      });
    }

    user = new User({ ...req.body });

    const salt = await bcrypt.genSalt(10);

    // @ts-ignore
    user.password = await bcrypt.hash(password, salt);

    // @ts-ignore
    const userId = user._id;

    // @ts-ignore
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: `48h`,
    });

    await user.save();

    user = await User.findById(userId).select("-password");

    res.cookie("__postly", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 1000 * 24,
    });

    res.status(200).json({ token, user }).end();
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
