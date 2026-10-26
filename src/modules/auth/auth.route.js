import express from "express";
import { loginController, registerController, getUsersController } from "./auth.controller.js";
export const authRouter = express.Router();



authRouter.post("/register", registerController);
authRouter.post("/login",loginController )
authRouter.get("/users", getUsersController);