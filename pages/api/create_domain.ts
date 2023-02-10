import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Domain from "../../models/Domain";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { domain, errorPage } = req.body;

  try {
    // Check if the user is admin or not
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
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

  // Create a new domain
  // @ts-ignore
  const newDomain = await Domain.create({
    domain,
    errorPage: errorPage || `${domain}/red/404`,
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
    data: newDomain,
  });
}
