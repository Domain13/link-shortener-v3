// COMPLETE

// Create new domain

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Domain from "../../models/Domain";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../../models/User";

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

  console.log(username);

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

  console.log("====================================");
  console.log("Error page: ", errorPage);
  console.log("====================================");

  const errorPageWithDomain = errorPage
    ? `${domain}/${errorPage}`
    : `${domain}/404`;

  // Create a new domain
  // @ts-ignore
  const newDomain = await Domain.create({
    domain,
    errorPage: errorPageWithDomain,
  });

  if (!newDomain) {
    // server error
    return res.status(500).json({
      message: "Server error",
      type: "SERVER_ERROR",
    });
  }

  return res.status(200).json({
    message: "Domain created",
    type: "SUCCESS",
  });
}
