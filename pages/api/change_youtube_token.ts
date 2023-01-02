// COMPLETE

// Create a token
// if the token is already created, replace it
// if the token is not created, create it

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
// import Token from "../../models/Token";
import State from "../../models/State";
import isAdmin from "../../lib/isAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Get the username from the cookies jwt token
  // const jwtToken = req.cookies.token;
  const { token } = req.body;

  // if (!jwtToken) {
  //   return res.status(400).json({
  //     message: "Token is not provided",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // const { username } = jwt.verify(jwtToken, process.env.JWT_SECRET) as {
  //   username: string;
  // };

  // // Find the user with the given username
  // // @ts-ignore
  // const user = await User.findOne({
  //   username,
  // });

  // // If there is no user with the given username
  // if (!user || user.role !== "admin") {
  //   return res.status(400).json({
  //     message: "Username or password is incorrect",
  //     type: "UNAUTHORIZED",
  //   });
  // }

  // Check if the user is admin
  await isAdmin(req, res);

  // insert the token into the database
  // or update it if it already exists
  // @ts-ignore
  // const tokenResult = await Token.findOneAndUpdate({ token });
  // const tokenResult = await State.findOneAndUpdate(
  //   { youtubeToken: token }
  // );

  // if (!tokenResult) {
  //   // @ts-ignore
  //   // await Token.create({
  //   //   token,
  //   // });
  //   await State.create({
  //     youtubeToken: token,
  //   });
  // }

  // Update/Insert the token into the database
  // Note that there will be only one document in the database
  // @ts-ignore
  await State.findOneAndUpdate(
    {},
    {
      youtubeToken: token,
    },
    {
      upsert: true,
    }
  );

  return res.status(200).json({
    message: "Token created",
    type: "SUCCESS",
  });
}
