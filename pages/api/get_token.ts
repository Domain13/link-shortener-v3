import Token from "../../models/Token";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token: jwtToken } = req.cookies;

  await dbConnect();

  if (!jwtToken) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

  // Check if the user is admin
  if (decode.username !== "admin") {
    return res.status(400).json({
      message: "You are not admin",
      type: "UNAUTHORIZED",
    });
  }

  //   get first tokens
  //  @ts-ignore
  const token = await Token.findOne({});

  return res.status(200).json({
    message: "Tokens fetched successfully",
    data: token,
    type: "SUCCESS",
  });
}
