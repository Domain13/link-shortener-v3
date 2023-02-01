import State from "../../models/State";
import User from "../../models/User";
import Domain from "../../models/Domain";
import ShortUrl from "../../models/ShortUrl";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import isAdmin from "../../lib/isAdmin";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // // await dbConnect();

  // Check if the user is admin
  //   await isAdmin(req, res);

  //   // Copy all data from the databse and save it to each file under "temp-data" directory
  //   // @ts-ignore
  //   const state = await State.findOne({});
  //   // @ts-ignore
  //   const users = await User.find({});
  //   // @ts-ignore
  //   const domains = await Domain.find({});
  //   // @ts-ignore
  //   const shortUrls = await ShortUrl.find({});

  //   // Write the data to the files
  //   fs.writeFileSync("temp-data/state.json", JSON.stringify(state));
  //   fs.writeFileSync("temp-data/users.json", JSON.stringify(users));
  //   fs.writeFileSync("temp-data/domains.json", JSON.stringify(domains));
  //   fs.writeFileSync("temp-data/shortUrls.json", JSON.stringify(shortUrls));

  //   return res.status(200).json({
  //     message: "Data copied successfully",
  //     type: "SUCCESS",
  //   });

  /////////////////////////////////////////////////////

  // // Copy all data from the files and save it to the database
  // const state = JSON.parse(fs.readFileSync("temp-data/state.json", "utf-8"));
  // const users = JSON.parse(fs.readFileSync("temp-data/users.json", "utf-8"));
  // const domains = JSON.parse(
  //   fs.readFileSync("temp-data/domains.json", "utf-8")
  // );
  // const shortUrls = JSON.parse(
  //   fs.readFileSync("temp-data/shortUrls.json", "utf-8")
  // );

  // // Write the data to the database
  // // @ts-ignore
  // const stateRes = await State.findOneAndUpdate({}, state, { upsert: true });
  // // @ts-ignore
  // const userRes = await User.insertMany(users);
  // // @ts-ignore
  // const domainRes = await Domain.insertMany(domains);
  // // @ts-ignore
  // const shortUrlRes = await ShortUrl.insertMany(shortUrls);

  // //   return res.status(200).json({
  // //     message: "Data copied successfully",
  // //     type: "SUCCESS",
  // //   });

  // if (stateRes && userRes && domainRes && shortUrlRes) {
  //   return res.status(200).json({
  //     message: "Data copied successfully",
  //     type: "SUCCESS",
  //   });
  // }

  return res.status(200).json({
    message: "hello humans",
    type: "SUCCESS",
  });
}
