import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

export const userRegisterSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})