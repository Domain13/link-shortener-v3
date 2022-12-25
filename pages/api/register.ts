// COMPLETE

// await fetch("/api/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     username: "admin",
//     password: "admin",
//   }),
// });

// create new user
// only admins can do it (check user.role)

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username, password } = req.body;

  // Get the adminUser and adminPassword from the cookies jwt token
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

  const admin = jwt.verify(token, process.env.JWT_SECRET).username;

  // If there is no adminUser with the given username
  if (!admin || admin !== "admin") {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // If the password is correct
  // Check if the user already exists
  // @ts-ignore
  const user = await User.findOne({
    username,
  });

  // If the user already exists
  if (user) {
    return res.status(400).json({
      message: "User already exists",
      type: "BAD_REQUEST",
    });
  }

  // If the user does not exist
  // Create a new user
  const newUser = new User({
    username,
    password,
    // role is default `user`
  });

  // Save the new user
  await newUser.save();

  // If the user is created successfully
  // Return success
  return res.status(200).json({
    message: "User created successfully",
    type: "SUCCESS",
    data: {
      _id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    },
  });
}
