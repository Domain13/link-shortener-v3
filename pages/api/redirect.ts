import User from "../../models/User";
import ShortUrl from "../../models/ShortUrl";
// import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { token } = req.cookies;
  const { shortCode } = req.body;

  await dbConnect();

  // if (!token) {
  //   // redirect to 404
  //   return res.redirect("/404");
  // }

  // Verify the token
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find the user
  // @ts-ignore
  // const loggedUser = await User.findOne({
  //   username: decoded.username,
  // });

  // If the user is not found
  // if (!loggedUser) {
  //   // note found
  //   return res.json({
  //     message: "User is not logged in",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // Find the short url in the database
  // @ts-ignore
  const shortUrl = await ShortUrl.findOne({
    shortCode,
  });

  // If there is no short url with the given short url return 404.
  // TODO: Redirect to a errorPage included in the short url or
  if (!shortUrl) {
    return res.json({
      message: "Short url not found",
      type: "NOTFOUND",
    });
  }

  // Find the user of the short url
  // @ts-ignore
  const user = await User.findOne({
    username: shortUrl.username,
  });

  // console.log("User by short url: ", user);
  // console.log("Logged user: ", loggedUser);

  // If the user is not found return 404
  if (!user) {
    return res.json({
      message: "User not found",
      type: "NOTFOUND",
    });
  }

  // If the user is not the same as the logged in user return 404
  // if (user.username !== loggedUser.username) {
  //   // return res.redirect("/404");
  //   return res.json({
  //     message: "User is not the same as the logged in user",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // +1 to the clicks
  shortUrl.clicks += 1;
  await shortUrl.save();

  if (shortUrl.clicks % 5 === 0) {
    if (user.shouldRedirectOnLimit === true) {
      //   return {
      //     // redirect to shortUrl.errorPage
      //     redirect: {
      //       destination: shortUrl.errorPage,
      //       permanent: true,
      //     },
      //   };

      return res.json({
        message: "Redirect to the error page",
        type: "REDIRECT",
        data: shortUrl.errorPage,
      });
    }
  }

  // const redirectUrl = `https://www.tiktok.com/link/v2?aid=1988&lang=en&scene=bio_url&target=https://www.youtube.com/redirect?q=${shortUrl.originalUrl}%26redir_token=${shortUrl.youtubeToken}`;

  const redirectUrl = shortUrl.originalUrl;

  return res.json({
    message: "Redirect to the original url",
    type: "REDIRECT",
    data: redirectUrl,
  });
}
