import User from "../../models/User";
// import Token from "../../models/Token";
import State from "../../models/State";
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

  // Find the user with the given username
  // @ts-ignore
  const user = await User.findOne({
    username: decode.username,
  });

  // Check if the user is admin
  if (!user || user.role !== "admin") {
    return res.status(400).json({
      message: "You are not admin",
      type: "UNAUTHORIZED",
    });
  }

  //   get first tokens
  //  @ts-ignore
  const state = await State.findOne({});

  return res.status(200).json({
    message: "Tokens fetched successfully",
    data: {
      youtubeToken: state.youtubeToken,
    },
    type: "SUCCESS",
  });
}
