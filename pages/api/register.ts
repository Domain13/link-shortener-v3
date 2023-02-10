import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Domain from "../../models/Domain";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username, password, domain, affiliateCodes, shouldRedirectOnLimit } =
    req.body;

  // Check if the current user is an admin
  try {
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

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
    affiliateCodes,
    shouldRedirectOnLimit,
  });

  try {
    // Save the new user
    await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username already exists",
        type: "ALREADY",
      });
    }
  }

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
      affiliateCodes: newUser.affiliateCodes,
      shouldRedirectOnLimit: newUser.shouldRedirectOnLimit,
    },
  });
}
