// COMPLETE

// Create new domain

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Domain from "../../models/Domain";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { domain, errorPage } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
      type: "UNAUTHORIZED",
    });
  }

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

  // Check if the domain is already present or not
  // @ts-ignore
  const domainToCheck = await Domain.findOne({
    domain,
  });

  if (domainToCheck) {
    return res.status(409).json({
      message: "Domain Already exists",
      type: "ALREADY",
    });
  }

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
