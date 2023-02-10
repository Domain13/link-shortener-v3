import ShortUrl from "../../models/ShortUrl";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    // Check if the user is admin or not
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  // Get all short urls
  // @ts-ignore
  const shortUrls = await ShortUrl.find({});

  return res.status(200).json({
    message: "Short urls fetched successfully",
    data: shortUrls,
    type: "SUCCESS",
  });
}
