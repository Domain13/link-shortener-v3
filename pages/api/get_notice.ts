import { NextApiRequest, NextApiResponse } from "next";
import State from "../../models/State";
import dbConnect from "../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // @ts-ignore
  const state = await State.findOne({});

  if (!state) {
    return res.status(400).json({
      message: "State not found",
      type: "NOTFOUND",
    });
  }

  return res.status(200).json({
    message: "State found",
    type: "SUCCESS",
    data: state.notice,
  });
}
