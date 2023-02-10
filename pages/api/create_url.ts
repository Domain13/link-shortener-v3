import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import ShortUrl from "../../models/ShortUrl";
import State from "../../models/State";
import Domain from "../../models/Domain";
import isUser from "../../lib/isUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { url, domain } = req.body;

  const user = await isUser(req, res);
  const codes = user.affiliateCodes; // code is an array

  // Check if the codes are present in the url
  // This is not required for the admin
  let isCodePresent = false;
  // Need to loop through the array
  if (user.role !== "admin") {
    codes.forEach((c: string) => {
      if (url.includes(c)) {
        isCodePresent = true;
        return;
      }
    });
  }

  if (!isCodePresent && user.role !== "admin") {
    return res.status(400).json({
      message: "Code is not present in the url",
      type: "UNAUTHORIZED",
    });
  }

  // Get the tokens from the database
  // @ts-expect-error
  const { youtubeToken } = await State.findOne({});

  if (!youtubeToken) {
    // server error
    return res.status(500).json({
      message: "Youtube tokens should be present in the database.",
      type: "SERVER_ERROR",
    });
  }

  // Check if the domain is already in the database
  // @ts-expect-error
  const domainExists = await Domain.findOne({
    domain,
  });

  if (!domainExists) {
    return res.status(400).json({
      message: "Domain does not exist",
      type: "NOTFOUND",
    });
  }

  // Create a new short url
  // @ts-expect-error
  const shortUrl = await ShortUrl.create({
    originalUrl: url,
    domain,
    username: user.username,
    errorPage: domainExists.errorPage,
    youtubeToken,
  });

  if (!shortUrl) {
    return res.status(500).json({
      message: "Server error",
      type: "SERVER_ERROR",
    });
  }

  return res.status(200).json({
    message: "Url created",
    type: "SUCCESS",
    data: shortUrl,
  });
}
