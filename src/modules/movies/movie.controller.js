import { createMovieService, deleteMovieService, getMovieservice, updateMovieService } from "./movie.service.js"




export const createMovieController = async (req, res) => {
    const movie = await createMovieService(req.body)
    res.json({
        status: "ok",
        movie: movie
    })
}



export const getMovieController = async (req, res) => {
    const movies = await getMovieservice()
    res.json({
        status: "ok",
        movies: movies
    })
}



export const deleteMovieController = async (req, res) => {
    try {
        await deleteMovieService(req.params.id);
        res.json({ status: "ok" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};


export const updateMovieController = async (req, res) => {
    const { id } = req.params;
    const data = req.body
    const movies = await updateMovieService(id, data)
    res.json({
        status: "ok",
        movies: movies
    })
}



