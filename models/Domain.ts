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
  encoded: {
    type: String,
    default: "",
  },
});

domainSchema.pre("save", function (next) {
  // double encode the domain name using encodeURIComponent
  const domain = this as any;
  const domainName = domain.domain;
  const encoded = encodeURIComponent(encodeURIComponent(domainName));

  domain.encoded = encoded;

  next();
});

export default mongoose.models.Domain || mongoose.model("Domain", domainSchema);
