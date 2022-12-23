// COMPLETE

// logout the user
// user's token is inside the cookie

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  res.status(200).json({ message: "Successfully logout", type: "SUCCESS" });
};
