import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    availableTokens: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose?.model("User", userSchema);

export default User;
