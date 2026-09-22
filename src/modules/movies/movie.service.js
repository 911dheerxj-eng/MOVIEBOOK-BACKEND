import mongoose from "mongoose";


export const createMovieService = async (data) => {
    const movie = await mongoose.connection.db.collection("movies").insertOne({
        name: data.name,
        rating: data.rating,
        publishDate: data.publishDate,
    });
    return movie
}




export const getMovieservice = async (data) => {
    const movies = await mongoose.connection.db.collection("movies").find().toArray()
    return movies
}




export const deleteMovieService = async (data) => {
    const movies = await mongoose.connection.db.collection("movies").deleteOne({
        _id: new mongoose.Types.ObjectId(data.id)
    });
    return movies
};




export const updateMovieService = async (id, data) => {
    const movies = await mongoose.connection.db.collection("movies").updateOne({
        _id: new mongoose.Types.ObjectId(id)
    }, {$set: { ...data }}
)
    return movies;
}


