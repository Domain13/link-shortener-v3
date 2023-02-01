import Domain from "../../models/Domain";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

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

  // Find the domain with the given domain
  // @ts-ignore
  const domain = await Domain.findOne({
    _id,
  });

  // If there is no domain with the given domain
  if (!domain) {
    return res.status(400).json({
      message: "Domain does not exist",
      type: "NOTFOUND",
    });
  }

  // If there is a domain with the given domain
  // Delete the domain
  await domain.deleteOne();

  // return success
  return res.status(200).json({
    message: "Domain deleted successfully",
    type: "SUCCESS",
  });
}
