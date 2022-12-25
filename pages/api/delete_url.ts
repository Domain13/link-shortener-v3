import ShortUrl from "../../models/ShortUrl";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;
  const { _id } = req.body;

  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

  const { username } = jwt.verify(token, process.env.JWT_SECRET) as {
    username: string;
  };

  await dbConnect();

  // Find the adminUser with the given username
  // @ts-ignore
  const admin = await User.findOne({
    username,
  });

  // If there is no adminUser with the given username
  if (!admin || admin.role !== "admin") {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // Find the shortUrl with the given shortUrl
  // @ts-ignore
  const shortUrl = await ShortUrl.findOne({
    _id,
  });

  // If there is no shortUrl with the given shortUrl
  if (!shortUrl) {
    return res.status(400).json({
      message: "ShortUrl does not exist",
      type: "NOTFOUND",
    });
  }

  // If there is a shortUrl with the given shortUrl
  // Delete the shortUrl
  await shortUrl.deleteOne();

  // return success
  return res.status(200).json({
    message: "ShortUrl deleted successfully",
    type: "SUCCESS",
  });
}
