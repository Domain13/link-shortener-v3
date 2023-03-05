import mongoose from "mongoose";
import { Schema } from "mongoose";

const stateSchema = new Schema({
  youtubeToken: {
    type: String,
  },
  notice: {
    type: String,
    default: "",
  },
});

export default mongoose.models.State || mongoose.model("State", stateSchema);
