// COMPLETE

import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { serialize, CookieSerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username, password } = req.body;

  // Find the user with the given username
  // @ts-ignore
  const user = await User.findOne({
    username,
  });

  // If there is no user with the given username
  if (!user) {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // If there is a user with the given username
  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // If the password is not correct
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // If the password is correct
  // Create a token
  const token = jwt.sign(
    {
      username: user.username,
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      // 30 days
      expiresIn: "30d",
    }
  );

  // Get the domain name
  // console.log(req.headers.host);

  const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    // any domain
    // domain: req.headers.host,
  };

  res.setHeader("Set-Cookie", serialize("token", token, cookieOptions));
  res.status(200).json({
    message: "You are now logged in!",
    type: "SUCCESS",
    data: {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
  });
}
