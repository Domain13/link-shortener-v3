import State from "../../models/State";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const user = await isAdmin(req, res);

  const { token } = req.body;

  // @ts-ignore
  await State.findOneAndUpdate({}, { firstToken: token }, { upsert: true });

  return res.status(200).json({
    message: "Token updated successfully",
    type: "SUCCESS",
  });
}
