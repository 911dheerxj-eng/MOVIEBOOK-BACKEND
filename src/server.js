import express from "express"
import { connectDb } from "../utils/db_connect.js"
import { movieRouter } from "./modules/movies/movie.route.js"
import { actorRouter } from "./modules/actors/actor.route.js"
import { movieCastRouter } from "./modules/movie_cast/movie_cast.route.js"
import { ticketRouter } from  "./modules/tickets/ticket.route.js";
import { authRouter } from "./modules/auth/auth.route.js"
import dotenv from  "dotenv"
dotenv.config()
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())
app.use("/movies", movieRouter)
app.use("/actors", actorRouter)
app.use("/movieCast",movieCastRouter)
app.use("/ticket", ticketRouter)
app.use("/auth", authRouter)


connectDb()
app.listen (3000,()=>{
    console.log("server is up and running")
});