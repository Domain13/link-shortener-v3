import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async (req, res) => {
  await dbConnect();

  const { cookies } = req;
  const { token } = cookies;

  if (!token) {
    return res.status(400).json({
      message: "User is not logged in",
      type: "UNAUTHORIZED",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // @ts-ignore
  const user = await User.findOne({ username: decoded.username });
  if (!user) {
    return res.status(400).json({
      message: "User not exists",
      type: "UNAUTHORIZED",
    });
  }

  return res.status(200).json({
    message: "User is logged in",
    type: "SUCCESS",
    data: {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
  });
};
