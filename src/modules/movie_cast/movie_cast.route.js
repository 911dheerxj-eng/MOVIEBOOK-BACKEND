import express from "express"
import { createMovieCastController, deleteMovieCastController, getMovieCastController, updateMovieCastController } from "./movie_cast.controller.js"
import { movieRouter } from "../movies/movie.route.js"
export const movieCastRouter = express.Router()

movieCastRouter.post("/",createMovieCastController)
movieCastRouter.get("/",getMovieCastController)
movieCastRouter.delete("/:id",deleteMovieCastController)
movieCastRouter.put("/:idn",updateMovieCastController)