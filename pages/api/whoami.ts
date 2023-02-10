import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";
import isUser from "../../lib/isUser";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const user = await isUser(req, res);

    if (user) {
      return res.status(200).json({
        message: "User is logged in",
        type: "SUCCESS",
        data: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      type: "UNAUTHORIZED",
    });
  }
}
