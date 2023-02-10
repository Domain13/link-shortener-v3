import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import State from "../../models/State";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { token } = req.body;

  // Check if the user is admin
  await isAdmin(req, res);

  // Update/Insert the token into the database
  // Note that there will be only one document in the database
  // @ts-ignore
  await State.findOneAndUpdate(
    {},
    {
      youtubeToken: token,
    },
    {
      upsert: true,
    }
  );

  return res.status(200).json({
    message: "Token created",
    type: "SUCCESS",
  });
}
