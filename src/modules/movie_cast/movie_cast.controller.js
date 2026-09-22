import { createMovieCastService } from "./movie_cast.service.js";
import { getMovieCastService } from "./movie_cast.service.js";
import { deleteMovieCastService } from "./movie_cast.service.js";
import { updateMovieCastService } from "./movie_cast.service.js";

export const createMovieCastController = async (req, res) => {
    const movieCast = await createMovieCastService(req.body)
    res.json({
        status: "ok",
        movieCast: movieCast
    })
};




export const getMovieCastController = async (req, res) => {
    const movieCast = await getMovieCastService({
        movie_id: Number(req.query.movie_id)
    });
    res.json({
        status: "ok",
        movieCast
    });
};



export const deleteMovieCastController = async (req, res) => {
    const movieCast = await deleteMovieCastService(req.params);
    res.json({
        status: "ok",
        movieCast
    });
};



export const updateMovieCastController = async (req, res) => {
    const { id } = req.params;
    const data = {
        id,...req.body
    };
    const movies = await updateMovieCastService(data)
    res.json({
        status: "ok",
        movieCast: movies
    })
}