import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://911dheerxj_db_user:fQtcHL7K1YAwhFKf@moviedb.lgbsps4.mongodb.net/db")
    console.log("Db connected");
    
}