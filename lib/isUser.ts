// is user
// Check if the user is logged in or not

import User from "../models/User";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function isUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the username from the cookies jwt token
  const jwtToken = req.cookies.token;

  if (!jwtToken) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

  const { username } = jwt.verify(jwtToken, process.env.JWT_SECRET) as {
    username: string;
  };

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

  return user;
}
