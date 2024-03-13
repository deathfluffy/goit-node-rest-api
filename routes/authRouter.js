import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../helpers/validateBody.js";

import {userRegisterSchema, userLoginSchema} from "../schemas/usersSchemas.js";

import  authenticate  from "../middlewares/authentication.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), authController.register);

authRouter.post("/login", validateBody(userLoginSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;