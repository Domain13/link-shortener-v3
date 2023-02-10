import Domain from "../../models/Domain";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { _id } = req.body;

  try {
    // Check if the user is admin or not
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  // Find the domain with the given domain
  // @ts-ignore
  const domain = await Domain.findOne({
    _id,
  });

  // If there is no domain with the given domain
  if (!domain) {
    return res.status(400).json({
      message: "Domain does not exist",
      type: "NOTFOUND",
    });
  }

  // If there is a domain with the given domain
  // Delete the domain
  await domain.deleteOne();

  // return success
  return res.status(200).json({
    message: "Domain deleted successfully",
    type: "SUCCESS",
  });
}
