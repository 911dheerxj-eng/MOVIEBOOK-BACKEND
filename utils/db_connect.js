import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Db connected");
    
}