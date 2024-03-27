import bcrypt from "bcrypt";
import gravatar from "gravatar";
import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const register = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const avatarURL = await gravatar.url(data);
  return User.create({ ...data, password: hashPassword, avatarURL });
};

export const validatePassword = (password, hashPassword) =>
  bcrypt.compare(password, hashPassword);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

