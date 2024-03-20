import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";
import path from "path";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import fs from "fs/promises";

import dotenv from "dotenv";
import { resizeImage } from "../middlewares/imageHelpers.js";
dotenv.config();
const { JWT_SECRET } = process.env;



const register = async (req, res) => {
  const { email } = req.body;

  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authServices.register(req.body);

  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password valid");
  }
  const comparePassword = await authServices.validatePassword(
    password,
    user.password
  );
  if (!comparePassword) {
    throw HttpError(401, "Email or password valid");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
  });
};
const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    subscription,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};
const updateAvatar = async (req, res) => {
 
      const { path: oldPath, originalname } = req.file;
      const { _id: userId } = req.user; 

    
      await resizeImage(oldPath);

      
      const newImageName = `${userId}_${originalname}`;

      const newPath = path.join("public", "avatars", newImageName);

     
      await fs.rename(oldPath, newPath);


      const result = await authServices.updateUser(userId, { avatarURL: newPath });

      res.status(200).json({
          avatarURL: result.avatarURL
      });

};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
