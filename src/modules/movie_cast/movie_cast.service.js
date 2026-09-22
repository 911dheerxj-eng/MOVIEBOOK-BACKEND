import mongoose from "mongoose";



export const createMovieCastService = async (data) => {
    const movieCast = await mongoose.connection.db.collection("movieCast").insertOne({
        name: data.name,
        actor_id: data.actor_Id,
        movie_id: data.movie_id
    });
    return movieCast;
}




export const getMovieCastService = async (data) => {
    const movieCast = await mongoose.connection.db.collection("movieCast").find({
        movie_id: data.movie_id
    }).toArray()
    return movieCast;
}





export const deleteMovieCastService = async(data)=>{
    const movieCast = await mongoose.connection.db.collection("movieCast").deleteOne({
            _id: new mongoose.Types.ObjectId(data.id)
        });
        return movieCast;
}





export const updateMovieCastService = async(data)=>{
    const { id, ...updateData } = data;
    const movieCast =  await mongoose.connection.db.collection("movieCast").updateOne({
            _id: new mongoose.Types.ObjectId(id)
        }, {
            $set: {
                ...updateData
            }
        })
        return movieCast;
}