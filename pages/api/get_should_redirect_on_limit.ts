import State from "../../models/State";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { token } = req.cookies;

  await dbConnect();

  // if (!token) {
  //   return res.status(400).json({
  //     message: "Token is not provided",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // const decode = jwt.verify(token, process.env.JWT_SECRET);

  // // Check if the user is admin
  // if (decode.username !== "admin") {
  //   return res.status(400).json({
  //     message: "You are not admin",
  //     type: "UNAUTHORIZED",
  //   });
  // }

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
