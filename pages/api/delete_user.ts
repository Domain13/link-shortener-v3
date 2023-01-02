import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { token } = req.cookies;
  const { _id } = req.body;

  // if (!token) {
  //   return res.status(400).json({
  //     message: "Token is not provided",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // const { username } = jwt.verify(token, process.env.JWT_SECRET) as {
  //   username: string;
  // };

  await dbConnect();

  // Find the adminUser with the given username
  // @ts-ignore
  // const admin = await User.findOne({
  //   username,
  // });

  // // If there is no adminUser with the given username
  // if (!admin || admin.role !== "admin") {
  //   return res.status(400).json({
  //     message: "Username or password is incorrect",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // Check if the user is admin
  await isAdmin(req, res);

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
