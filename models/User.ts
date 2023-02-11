import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  domain: {
    type: String,
  },
  affiliateCodes: {
    type: Array,
    default: [],
  },
  shouldRedirectOnLimit: {
    type: Boolean,
    default: true,
  },
  shouldAlwaysRedirect: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) return next(error);
    user.password = hash;
    next();
  });
});

export default mongoose.models.User || mongoose.model("User", userSchema);
