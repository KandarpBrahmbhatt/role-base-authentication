import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;