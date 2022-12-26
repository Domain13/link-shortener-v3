import mongoose from "mongoose";
import { Schema } from "mongoose";

const stateSchema = new Schema({
  shouldRedirectOnLimit: {
    type: Boolean,
    default: true,
  },
  googleToken: {
    type: String,
  },
  youtubeToken: {
    type: String,
  },
});

export default mongoose.models.State || mongoose.model("State", stateSchema);
