import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id } = req.body;

  await dbConnect();

  try {
    // Check if the user is admin or not
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  // Find the user with the given _id
  // @ts-ignore
  const user = await User.findOne({
    _id,
  });

  // If there is no user with the given _id
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
      type: "NOTFOUND",
    });
  }

  // check if the user is an admin
  if (user.role === "admin") {
    return res.status(400).json({
      message: "You cannot delete an admin",
      type: "UNAUTHORIZED",
    });
  }

  // If there is a user with the given _id
  // Delete the user
  await user.deleteOne();

  // return success
  return res.status(200).json({
    message: "User deleted successfully",
    type: "SUCCESS",
  });
}
