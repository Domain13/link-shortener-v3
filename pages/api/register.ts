// COMPLETE

// create new user
// only admins can do it (check user.role)

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username, password } = req.body;

  // Get the adminUser and adminPassword from the cookies jwt token
  const { token } = req.cookies;
  const admin = jwt.verify(token, process.env.JWT_SECRET).username;

  console.log("====================================");
  console.log("adminUser: ", admin);
  console.log("====================================");

  // Find the adminUser with the given username
  // const admin = await User.findOne({
  //   username: adminUser,
  // });

  // If there is no adminUser with the given username
  if (!admin || admin !== "admin") {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // const adminPassword = admin.password;

  // If there is a adminUser with the given username
  // Check if the password is correct
  // const isPasswordCorrect = await bcrypt.compare(adminPassword, admin.password);

  // If the password is not correct
  // if (!isPasswordCorrect) {
  // return res.status(400).json({
  // message: "Username or password is incorrect",
  // type: "UNAUTHORIZED",
  // });
  // }

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
  });
}
