import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import isAdmin from "../../lib/isAdmin";

// Change the domain of the user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  await isAdmin(req, res);

  const { _id, domain } = req.body;

  // Find the user with the given _id
  // @ts-ignore
  const user = await User.findOne({
    _id,
  });

  // If there is no user with the given _id
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      type: "NOTFOUND",
    });
  }

  // User has a domain field.
  // Update the domain
  // @ts-ignore
  user.domain = domain;
  await user.save();

  return res.status(200).json({
    message: "Domain updated successfully",
    type: "SUCCESS",
  });
}
