// create a mongoose schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const shortId = require('shortid');

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
  token: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// create a model
// const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

export default mongoose.models.ShortUrl ||
  mongoose.model("ShortUrl", shortUrlSchema);
