import { actorRouter } from "./modules/actors/actor.route.js";
import { movieCastRouter } from "./modules/movie_cast/movie_cast.route.js";
import { movieRouter } from "./modules/movies/movie.route.js";
import { ticketRouter } from "./modules/tickets/ticket.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import adminRouter from "./modules/Admin/Admin.route.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDb } from "../utils/db_connect.js"

const app = express();

app.use(cors());
app.use(express.json());


app.use("/movies", movieRouter);
app.use("/actors", actorRouter);
app.use("/movie-cast", movieCastRouter);
app.use("/ticket", ticketRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
 

connectDb();

app.listen(3000, () => {
  console.log("server is up and running");
});