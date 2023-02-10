// is admin
// Check if the user is admin

import { NextApiRequest, NextApiResponse } from "next";
import isUser from "./isUser";

export default async function isAdmin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await isUser(req, res);

    // If the user is not an admin
    if (user.role !== "admin") {
      throw new Error("You are not an admin");
    }

    return user;
  } catch (error) {
    throw error;
  }
}
