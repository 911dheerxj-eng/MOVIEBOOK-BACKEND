import { createMovieController, deleteMovieController, getMovieController, updateMovieController } from "./movie.controller.js"
import express from "express"
export const movieRouter = express.Router()



movieRouter.post("/",createMovieController)
movieRouter.get("/",getMovieController)
movieRouter.delete("/:id",deleteMovieController)
movieRouter.put("/:id",updateMovieController)