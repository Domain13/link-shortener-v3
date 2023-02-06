// COMPLETE

// Create new domain

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Domain from "../../models/Domain";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { _id, errorPage } = req.body;
  // const { token } = req.cookies;

  // if (!token) {
  //   return res.status(400).json({
  //     message: "Token is not provided",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // const { username } = jwt.verify(token, process.env.JWT_SECRET) as {
  //   username: string;
  // };

  // // Find the adminUser with the given username
  // // @ts-ignore
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

  // Check if the domain is already present or not
  // @ts-ignore
  // const domainToCheck = await Domain.findOne({
  //   domain,
  // });
  // const domain = await Domain.findOne({
  //   _id,
  // });
  // if (domainToCheck) {
  //   return res.status(409).json({
  //     message: "Link Already exists",
  //     type: "ALREADY",
  //   });
  // }

  // const errorPageWithDomain = errorPage
  //   ? `${domain}/${errorPage}`
  //   : `${domain}/404`;

  // Create a new domain
  // @ts-ignore
  // const changeLink = await Domain.create({

  //   errorPage: errorPage
  // });
  console.log("_id: ", _id);
  console.log("errorPage: ", errorPage);

  const changeLink = await Domain.findOneAndUpdate(
    { _id },
    {
      errorPage: errorPage,
    }
  );

  if (!changeLink) {
    // server error
    return res.status(500).json({
      message: "Server error",
      type: "SERVER_ERROR",
    });
  }

  return res.status(200).json({
    message: "Redirect page updated",
    type: "SUCCESS",
    data: changeLink,
  });
}
