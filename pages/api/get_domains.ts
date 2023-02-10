import Domain from "../../models/Domain";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isUser from "../../lib/isUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Check if the user is authenticated or not
  let user = null;

  try {
    user = await isUser(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  let domainsToReturn = [];
  // Get the domains of the user
  // if the user is an admin, get all the domains
  if (user.role === "admin") {
    // @ts-expect-error
    const domains = await Domain.find({});
    domainsToReturn = domains;
  } else {
    // @ts-expect-error
    const domains = await Domain.find({ domain: user.domain });
    domainsToReturn = domains;
  }

  return res.status(200).json({
    message: "Domains fetched successfully",
    data: domainsToReturn,
    type: "SUCCESS",
  });
}
