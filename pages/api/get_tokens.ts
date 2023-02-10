import State from "../../models/State";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    // Check if the user is admin
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  //   get first tokens
  //  @ts-ignore
  const state = await State.findOne({});

  return res.status(200).json({
    message: "Tokens fetched successfully",
    data: {
      youtubeToken: state.youtubeToken,
    },
    type: "SUCCESS",
  });
}
