import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";
import State from "../../models/State";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Check if the user is admin
  try {
    await isAdmin(req, res);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }

  const { notice } = req.body;

  // Change the notice
  // @ts-ignore
  const state = await State.findOne({});
  // @ts-ignore
  state.notice = notice;
  await state.save();

  return res.status(200).json({
    message: "Notice updated successfully",
    type: "SUCCESS",
  });
}
