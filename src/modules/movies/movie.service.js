import mongoose from "mongoose";
import { Movies } from "./movie.model.js";



export const createMovieService = async (data) => {
    const movie = await Movies.insertOne({
        name: data.name,
        rating: data.rating,
        publishDate: data.publishDate,
        noOfTickets: data.noOfTickets,
        thumbnail: data.thumbnail
    });

    return movie;
}



export const getMovieservice = async (data) => {
    const movies = await Movies.find()
    return movies
}



export const deleteMovieService = async (id) => {
    const movie = await Movies.findByIdAndDelete(id);
    return movie;
};



export const updateMovieService = async (id, data) => {
    const movies = await Movies.updateOne({
        _id: new mongoose.Types.ObjectId(id)
    }, { $set: { ...data } }
    )
    return movies;
}


