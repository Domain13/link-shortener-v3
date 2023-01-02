// COMPLETE

// await fetch("/api/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     username: "admin",
//     password: "admin",
//     domain: "http://localhost:3000",
//     shouldRedirectOnLimit: true,
//     firstToken: "https://click.snapchat.com/aVHG?&af_web_dp"
//   }),
// });

// create new user
// only admins can do it (check user.role)

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Domain from "../../models/Domain";
import jwt from "jsonwebtoken";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const {
    username,
    password,
    domain,
    code,
    shouldRedirectOnLimit,
    firstToken,
  } = req.body;

  // // Get the adminUser and adminPassword from the cookies jwt token
  // const { token } = req.cookies;

  // if (!token) {
  //   return res.status(400).json({
  //     message: "Token is not provided",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // const admin = jwt.verify(token, process.env.JWT_SECRET).username;

  // // If there is no adminUser with the given username
  // if (!admin || admin !== "admin") {
  //   return res.status(400).json({
  //     message: "Username or password is incorrect",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // // If the password is correct
  // // Check if the user already exists
  // // @ts-ignore
  // const user = await User.findOne({
  //   username,
  // });

  // // If the user already exists
  // if (user) {
  //   return res.status(400).json({
  //     message: "User already exists",
  //     type: "ALREADY",
  //   });
  // }

  // Check if the current user is an admin
  await isAdmin(req, res);

  // Check if the domain exists
  // @ts-ignore
  const domainExists = await Domain.findOne({
    domain,
  });

  // If the domain does not exist
  if (!domainExists) {
    return res.status(400).json({
      message: "Domain does not exist",
      type: "NOTFOUND",
    });
  }

  // If the user does not exist
  // Create a new user
  const newUser = new User({
    username,
    password,
    domain,
    code,
    shouldRedirectOnLimit,
    firstToken,

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
      domain: newUser.domain,
      code: newUser.code,
      shouldRedirectOnLimit: newUser.shouldRedirectOnLimit,
      firstToken: newUser.firstToken,
    },
  });
}
