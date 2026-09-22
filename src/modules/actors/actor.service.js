import mongoose from "mongoose";


export const createActorService = async(data)=>{
    const actor = await mongoose.connection.db.collection("actors").insertOne({
            name: data.name,
        });
        return actor;
    }
    


export const getActorService = async(data)=>{
    const actors = await mongoose.connection.db.collection("actors").find().toArray()
        return actors
}    




export const deleteActorService = async(data)=>{
    const actors = await mongoose.connection.db.collection("actors").deleteOne({
            _id: new mongoose.Types.ObjectId(data.id)
        });
        return actors
}




export const updateActorService = async (p)=>{
     const { id, data } = p;
     const actors = await mongoose.connection.db.collection("actors").updateOne({
            _id: new mongoose.Types.ObjectId(id)
        }, {
            $set: {
                ...data
            }
        })
        return actors;
}