// COMPLETE

// change the user's password
// only the user can change their own password
// get the admin's token from the cookies and verify it

import User from "../../models/User";
import bcrypt from "bcrypt";
import dbConnect from "../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username, password, newPassword } = req.body;

  // Find the user with the given username
  // @ts-ignore
  const user = await User.findOne({
    username,
  });

  // If there is no user with the given username
  if (!user) {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // If there is a user with the given username
  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // If the password is not correct
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // If the password is correct
  // Change the user's password
  // the password will be hashed in the model
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = newPassword;

  await user.save();

  // return success
  return res.status(200).json({
    message: "Password changed successfully",
    type: "SUCCESS",
  });
}
