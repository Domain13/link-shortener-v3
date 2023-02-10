import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Check if the user is admin
  try {
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  const { _id, affiliateCodes } = req.body;

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

  // User has a affiliateCodes field.
  // Update the affiliateCodes
  // @ts-ignore
  user.affiliateCodes = affiliateCodes;
  await user.save();

  return res.status(200).json({
    message: "Affiliate codes updated successfully",
    type: "SUCCESS",
  });
}
