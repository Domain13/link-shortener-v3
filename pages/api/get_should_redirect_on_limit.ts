import State from "../../models/State";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Check if the user is admin
  await isAdmin(req, res);

  //   get first states
  // @ts-ignore
  const state = await State.findOne({});
  const shouldRedirectOnLimit = state.shouldRedirectOnLimit;

  return res.status(200).json({
    message: "State fetched successfully",
    data: shouldRedirectOnLimit,
    type: "SUCCESS",
  });
}
