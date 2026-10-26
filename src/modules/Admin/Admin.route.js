import express from "express";

import { dashboard, users, removeUser, movies, createMovie, removeMovie, getBookingsController} from "./Admin.controller.js";
import { validateUser } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "./Admin.middleware.js";
import { getBookingsService } from "./Admin.service.js";

const router = express.Router();


router.get("/dashboard",validateUser,adminMiddleware,dashboard);
router.get( "/users", validateUser, adminMiddleware, users);
router.delete("/users/:id",validateUser,adminMiddleware,removeUser);
router.get("/movies",validateUser,adminMiddleware,movies);
router.post( "/movies", validateUser, adminMiddleware, createMovie);
router.delete( "/movies/:id", validateUser, adminMiddleware, removeMovie);
router.get("/bookings", validateUser, adminMiddleware,getBookingsController);

export default router;