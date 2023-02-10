import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { _id } = req.body;

  // Check if the user is admin
  await isAdmin(req, res);

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

  // If the state is found
  // If the state.shouldRedirectLimit is true make it false
  if (user.shouldRedirectOnLimit === true) {
    user.shouldRedirectOnLimit = false;
  } else {
    user.shouldRedirectOnLimit = true;
  }

  // Save the user
  await user.save();

  return res.status(200).json({
    message: "State changed successfully",
    type: "SUCCESS",
  });
}
