import State from "../../models/State";
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

  const { _id, firstToken } = req.body;

  // // @ts-ignore
  //   await State.findOneAndUpdate({}, { firstToken: token }, { upsert: true });

  //   return res.status(200).json({
  //     message: "Token updated successfully",
  //     type: "SUCCESS",
  //   });

  // Find the user with the given username
  // @ts-ignore
  const user = await User.findOne({
    _id,
  });

  // If there is no user with the given username
  if (!user) {
    return res.status(400).json({
      message: "Username or password not found",
      type: "NOTFOUND",
    });
  }

  // Update the token
  // @ts-ignore
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    {
      firstToken,
    }
  );

  return res.status(200).json({
    message: "Token updated successfully",
    type: "SUCCESS",
  });
}
