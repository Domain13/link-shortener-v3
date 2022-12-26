import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;

  await dbConnect();

  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  // Check if the user is admin
  if (decode.username !== "admin") {
    return res.status(400).json({
      message: "You are not admin",
      type: "UNAUTHORIZED",
    });
  }

  //   Now get all users
  //   @ts-ignore
  const users = await User.find({}).select({
    _id: 1,
    username: 1,
    role: 1,
    domain: 1,
  });

  return res.status(200).json({
    message: "Users fetched successfully",
    data: users,
    type: "SUCCESS",
  });
}
