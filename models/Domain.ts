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
  //   siteDomain: {
  //     type: Boolean,
  //     default: false,
  //   },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// then conver the domain name to hexadeciaml ASCII code except for the first 2 characters
domainSchema.pre("save", function (next) {
  const domain = this as any;
  const domainName = domain.domain;

  // const domainNameWithoutProtocolAndTLDAndWWWAndSubdomains = domainNameWithoutProtocolAndTLDAndWWW.split(
  //   "."
  // )[0];
  //   const str = 'helloocpa.com';

  // for (let i = 0; i < str.length; i++) {
  //   const asciiValue = str.charCodeAt(i);
  //   const hexValue = asciiValue.toString(16);
  //   console.log(`${str[i]}: ${hexValue}`);
  // }

  const domainNameProtocol = domainName.split("://")[0];
  const domainNameWithoutProtocol = domainName.split("://")[1];
  const domainNameTLD = domainNameWithoutProtocol.split(".")[1];
  const domainNameWithoutProtocolAndTLD =
    domainNameWithoutProtocol.split(".")[0];

  const encoded = domainNameWithoutProtocolAndTLD
    .split("")
    .map((char) => {
      const asciiValue = char.charCodeAt(0);
      const hexValue = asciiValue.toString(16);
      return hexValue;
    })
    .join("%");

  // Now join the protocol, encoded domain name, and TLD
  domain.encoded = `${domainNameProtocol}://%${encoded}${
    domainNameTLD ? `.${domainNameTLD}` : ""
  }`;

  next();
});

export default mongoose.models.Domain || mongoose.model("Domain", domainSchema);
