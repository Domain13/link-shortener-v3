import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Domain from "../../models/Domain";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { _id, errorPage } = req.body;

  try {
    // Check if the user is admin
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  // @ts-ignore
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
