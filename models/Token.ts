import mongoose from "mongoose";
import { Schema } from "mongoose";

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
