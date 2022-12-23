import mongoose from "mongoose";
import { Schema } from "mongoose";

const domainSchema = new Schema({
  domain: {
    type: String,
    required: true,
  },
  errorPage: {
    type: String,
    required: true, // If empty, no direct to any page. Just return 404
  },
  //   siteDomain: {
  //     type: Boolean,
  //     default: false,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Domain || mongoose.model("Domain", domainSchema);
