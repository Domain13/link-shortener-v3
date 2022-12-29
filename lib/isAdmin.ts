// is admin
// Check if the user is admin

import { NextApiRequest, NextApiResponse } from "next";
import isUser from "./isUser";

export default async function isAdmin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await isUser(req, res);

  // If the user is not an admin
  if (user.role !== "admin") {
    return res.status(400).json({
      message: "You are not an admin",
      type: "UNAUTHORIZED",
    });
  }

  return user;
}
