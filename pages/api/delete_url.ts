import ShortUrl from "../../models/ShortUrl";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id } = req.body;

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

  // Find the shortUrl with the given shortUrl
  // @ts-ignore
  const shortUrl = await ShortUrl.findOne({
    _id,
  });

  // If there is no shortUrl with the given shortUrl
  if (!shortUrl) {
    return res.status(400).json({
      message: "ShortUrl does not exist",
      type: "NOTFOUND",
    });
  }

  // If there is a shortUrl with the given shortUrl
  // Delete the shortUrl
  await shortUrl.deleteOne();

  // return success
  return res.status(200).json({
    message: "ShortUrl deleted successfully",
    type: "SUCCESS",
  });
}
