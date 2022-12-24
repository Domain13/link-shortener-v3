// Create new domain

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import State from "../../models/State";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { domain, errorPage } = req.body;
  const { token } = req.cookies;

  const { username } = jwt.verify(token, process.env.JWT_SECRET) as {
    username: string;
  };

  // Find the adminUser with the given username
  // @ts-ignore
  const admin = await User.findOne({
    username,
  });

  // If there is no adminUser with the given username
  if (!admin || admin.role !== "admin") {
    return res.status(400).json({
      message: "Username or password is incorrect",
      type: "UNAUTHORIZED",
    });
  }

  // Find the state
  // @ts-ignore
  const state = await State.findOne({});
  if (!state) {
    return res.status(500).json({
      message: "Server error",
      type: "SERVER_ERROR",
    });
  }

  // If the state is found
  // If the state.shouldRedirectLimit is true make it false
  if (state.shouldRedirectOnLimit === true) {
    state.shouldRedirectOnLimit = false;
    await state.save();
  } else {
    state.shouldRedirectOnLimit = true;
    await state.save();
  }

  return res.status(200).json({
    message: "State changed successfully",
    type: "SUCCESS",
  });
}
