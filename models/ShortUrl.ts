import mongoose from "mongoose";
import shortId from "shortid";
import { Schema } from "mongoose";

const shortUrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    default: shortId.generate,
  },
  ////////////////////////////

  domain: {
    type: String,
    required: true,
  },
  errorPage: {
    type: String, // If empty, no direct to any page. Just return 404
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  ////////////////////////////////
  youtubeToken: {
    type: String,
    required: true,
  },
  googleToken: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  encoded: {
    type: String,
    required: true,
  },

  ////////////////////////////
  firstToken: {
    type: String,
    default: "",
  },
});

// create a model
// const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

export default mongoose.models.ShortUrl ||
  mongoose.model("ShortUrl", shortUrlSchema);
