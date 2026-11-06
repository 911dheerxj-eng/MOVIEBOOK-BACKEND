import express from "express";
import { loginController, registerController, getUsersController, forgotPasswordController, resetPasswordController } from "./auth.controller.js";
export const authRouter = express.Router();



authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/users", getUsersController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password", resetPasswordController);
