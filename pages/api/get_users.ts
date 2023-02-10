import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Check if the user is admin
  await isAdmin(req, res);

  //   Now get all users
  //   @ts-ignore
  const users = await User.find({}).select({
    _id: 1,
    username: 1,
    role: 1,
    domain: 1,
    affiliateCodes: 1,
    shouldRedirectOnLimit: 1,
  });

  return res.status(200).json({
    message: "Users fetched successfully",
    data: users,
    type: "SUCCESS",
  });
}
