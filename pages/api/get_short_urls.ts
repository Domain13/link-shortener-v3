import ShortUrl from "../../models/ShortUrl";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

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

  // Get all short urls
  // @ts-ignore
  const shortUrls = await ShortUrl.find({});

  return res.status(200).json({
    message: "Short urls fetched successfully",
    data: shortUrls,
    type: "SUCCESS",
  });
}
