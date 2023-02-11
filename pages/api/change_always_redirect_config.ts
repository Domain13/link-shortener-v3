import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { _id } = req.body;

  try {
    // Check if the user is admin
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  // Find the User
  // @ts-ignore
  const user = await User.findOne({
    _id,
  });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
      type: "NOTFOUND",
    });
  }

  // If the user.shouldAlwaysRedirect is true make it false
  if (user.shouldAlwaysRedirect === true) {
    user.shouldAlwaysRedirect = false;
  } else {
    user.shouldAlwaysRedirect = true;
  }

  // Save the user
  await user.save();

  return res.status(200).json({
    message: "State changed successfully",
    type: "SUCCESS",
  });
}
