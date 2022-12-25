// COMPLETE

// Create a token
// if the token is already created, replace it
// if the token is not created, create it

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import Token from "../../models/Token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Get the username from the cookies jwt token
  const jwtToken = req.cookies.token;
  const { token } = req.body;

  if (!token) {
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
  if (!user || user.role !== "admin") {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // insert the token into the database
  // or update it if it already exists
  // @ts-ignore
  const tokenResult = await Token.findOneAndUpdate({ token });

  if (!tokenResult) {
    // @ts-ignore
    const tokenResultAgain = await Token.create({
      token,
    });
  }

  return res.status(200).json({
    message: "Token created",
    type: "SUCCESS",
  });
}
