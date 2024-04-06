import  {Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp, packages, passwordRegexp } from "../constants/user-constants.js";

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: passwordRegexp,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: packages,
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;